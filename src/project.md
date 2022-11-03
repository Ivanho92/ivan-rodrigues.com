---
layout: layouts/project.html
pagination:
  data: projects
  size: 1
  alias: project
permalink: projects/{{ project.slug }}/
---
{% block content %}
  {{ project.description | safe }}
{% endblock %}