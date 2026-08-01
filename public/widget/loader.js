(function () {
  if (window.ZuvaWidgetLoaded) return;
  window.ZuvaWidgetLoaded = true;

  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = "/widget/widget.css";
  document.head.appendChild(css);

  const root = document.createElement("div");
  root.id = "zuva-widget-root";
  document.body.appendChild(root);

  const script = document.createElement("script");
  script.type = "module";
  script.src = "/widget/widget.js";
  document.body.appendChild(script);
})();