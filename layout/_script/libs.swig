{% if theme.theme.fancybox %}
  {% set fancybox_js = 'fancybox/jquery.fancybox.min.js' %}
{% endif %}

{%
  set js_libs = {
    slideout: 'slideout/slideout.js',
    fancybox: fancybox_js
  }
%}
<script type=text/javascript src=https://cdn.staticfile.org/jquery/3.2.1/jquery.min.js></script>
{% for lib in js_libs %}
  {% if lib %}
    <script type="text/javascript" src="{{ url_for('lib') }}/{{ lib }}?v={{ theme.version }}"></script>
  {% endif %}
{% endfor %}
