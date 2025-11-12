"""
UW Undergraduate Calendar Scraper
Scrapes course data including prerequisites from ucalendar.uwaterloo.ca
"""

import requests
from bs4 import BeautifulSoup
import json
import re
from typing import Dict, List, Optional
import time


class UWCalendarScraper:
    def __init__(self):
        self.base_url = "https://ucalendar.uwaterloo.ca"
        # Use 2425 for 2024-2025 academic year
        self.year = "2425"
        self.courses = {}
        
    def get_subject_url(self, subject_code: str) -> str:
        """Generate URL for a subject's course listing"""
        return f"{self.base_url}/{self.year}/COURSE/course-{subject_code}.html"
    
    def scrape_subject_courses(self, subject_code: str) -> Dict:
        """Scrape all courses for a given subject (e.g., MATH, CS, AMATH)"""
        url = self.get_subject_url(subject_code)
        print(f"Scraping {subject_code} courses from {url}")
        
        try:
            response = requests.get(url, timeout=10)
            response.raise_for_status()
        except requests.RequestException as e:
            print(f"Error fetching {subject_code}: {e}")
            return {}
        
        soup = BeautifulSoup(response.content, 'html.parser')
        courses = {}
        
        # Find all course entries
        # Typical structure: <div class="course"> or <div id="MATH135">
        course_divs = soup.find_all(['div', 'td'], class_=re.compile(r'course|courseblock'))
        
        if not course_divs:
            # Try alternative structure - look for course codes
            course_divs = soup.find_all(id=re.compile(rf'{subject_code}\d+'))
        
        for div in course_divs:
            course_data = self.parse_course_div(div, subject_code)
            if course_data:
                courses[course_data['code']] = course_data
        
        print(f"Found {len(courses)} courses for {subject_code}")
        return courses
    
    def parse_course_div(self, div, subject_code: str) -> Optional[Dict]:
        """Parse a single course div/section"""
        try:
            # Extract course code from various possible formats
            course_code = None
            title = None
            description = None
            units = 0.50
            prerequisites = None
            
            # Try to find course code
            code_elem = div.find(['strong', 'b', 'span'], class_=re.compile(r'course.*code|title'))
            if code_elem:
                text = code_elem.get_text().strip()
                # Match pattern like "MATH 135" or "CS 135"
                match = re.search(rf'{subject_code}\s*\d+', text)
                if match:
                    course_code = match.group().replace(' ', ' ')
                    # Extract title after code
                    title = text.split(course_code)[-1].strip(' -–')
            
            # Alternative: check div id
            if not course_code and div.get('id'):
                div_id = div.get('id')
                if re.match(rf'{subject_code}\d+', div_id):
                    course_code = f"{subject_code} {div_id[len(subject_code):]}"
            
            if not course_code:
                return None
            
            # Extract description
            desc_elem = div.find(['p', 'div'], class_=re.compile(r'description|coursedescrip'))
            if not desc_elem:
                # Get all text and clean it
                all_text = div.get_text()
                desc_elem = div
            
            if desc_elem:
                description = desc_elem.get_text().strip()
                # Clean up description
                description = re.sub(r'\s+', ' ', description)
                
                # Try to extract title if not found yet
                if not title:
                    lines = description.split('.')
                    if lines:
                        title = lines[0].strip()
            
            # Extract prerequisites
            prereq_text = self.extract_prerequisites(div.get_text())
            if prereq_text:
                prerequisites = self.parse_prerequisites(prereq_text)
            
            # Extract units
            unit_match = re.search(r'(\d+\.?\d*)\s*unit', div.get_text(), re.IGNORECASE)
            if unit_match:
                units = float(unit_match.group(1))
            
            return {
                'code': course_code,
                'title': title or 'Course Title',
                'description': description or 'No description available',
                'units': units,
                'prerequisites': prerequisites,
                'corequisites': None,
                'isAdvanced': self.is_advanced_course(course_code)
            }
            
        except Exception as e:
            print(f"Error parsing course: {e}")
            return None
    
    def extract_prerequisites(self, text: str) -> Optional[str]:
        """Extract prerequisite text from course description"""
        # Look for prerequisite section
        prereq_pattern = r'Prereq(?:uisite)?s?:([^.;]+(?:\.|;|$))'
        match = re.search(prereq_pattern, text, re.IGNORECASE)
        if match:
            return match.group(1).strip()
        return None
    
    def parse_prerequisites(self, prereq_text: str) -> Dict:
        """Parse prerequisite text into structured format"""
        # This is a simplified parser - real logic would be more complex
        # For now, just extract course codes
        courses = re.findall(r'[A-Z]{2,6}\s*\d{3}[A-Z]?', prereq_text)
        
        if not courses:
            return None
        
        # Simple logic: if we see "and", it's AND, if we see "or", it's OR
        if ' or ' in prereq_text.lower():
            return {
                'type': 'OR',
                'courses': courses
            }
        elif ' and ' in prereq_text.lower():
            return {
                'type': 'AND',
                'courses': courses
            }
        else:
            # Default to AND if multiple courses
            if len(courses) > 1:
                return {'type': 'AND', 'courses': courses}
            else:
                return {'type': 'AND', 'courses': courses}
    
    def is_advanced_course(self, course_code: str) -> bool:
        """Check if course is advanced (x4x or x6x)"""
        match = re.search(r'\d+', course_code)
        if match:
            num = match.group()
            if len(num) == 3:
                return num[1] in ['4', '6']
        return False
    
    def scrape_multiple_subjects(self, subjects: List[str]) -> Dict:
        """Scrape courses from multiple subjects"""
        all_courses = {}
        
        for subject in subjects:
            time.sleep(1)  # Be nice to the server
            courses = self.scrape_subject_courses(subject)
            all_courses.update(courses)
        
        return all_courses
    
    def save_to_file(self, courses: Dict, filename: str = 'uw_courses.json'):
        """Save scraped courses to JSON file"""
        with open(filename, 'w') as f:
            json.dump(courses, f, indent=2)
        print(f"Saved {len(courses)} courses to {filename}")


def main():
    scraper = UWCalendarScraper()
    
    # Scrape common subjects
    subjects = ['MATH', 'CS', 'AMATH', 'STAT', 'CO', 'ACTSC']
    
    print("Starting UW Calendar scraper...")
    courses = scraper.scrape_multiple_subjects(subjects)
    
    # Save to backend directory
    output_path = '/app/backend/data/uw_courses.json'
    scraper.save_to_file(courses, output_path)
    
    print(f"\nScraped {len(courses)} courses total")
    print(f"Saved to {output_path}")


if __name__ == '__main__':
    main()
