# UW-Visualiser

**Visualise your University of Waterloo course plan as an interactive prerequisite graph.**

---

## 🔎 What is UW-Visualiser?

UW-Visualiser processes course and prerequisite data from Waterloo and builds a dependency graph, so students can visually explore which courses unlock which, giving them a clear “map” of their degree. It helps avoid confusion with complex AND/OR prerequisites, nested dependencies, and enables planning ahead.

It’s built from the ground up using a backend that parses and normalizes course data, and a frontend that renders the graph into an interactive UI. I developed it as a personal project to make course-planning easier, especially useful for students navigating multi-term, multi-major constraints.  

---

## Features

- Parses raw course/prerequisite data into a normalized dependency graph  
- Handles complex requirements: AND, OR, nested conditions, alternate prerequisites  
- Interactive visualization: navigate courses, view unlocking relationships, trace future paths  
- Data + UI decoupled: backend handles logic and graph creation, frontend renders data cleanly  
- Easily extensible: can support additional metadata, filters, or exporting plans  
