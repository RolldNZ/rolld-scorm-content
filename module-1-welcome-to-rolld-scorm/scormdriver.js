
var scorm = {
  api: null,
  findAPI: function(win) {
    var tries = 0;
    while ((win.API == null) && (win.parent != null) && (win.parent != win)) {
      tries++;
      if (tries > 10) return null;
      win = win.parent;
    }
    return win.API;
  },
  init: function() {
    this.api = this.findAPI(window);
    if (this.api) {
      this.api.LMSInitialize("");
      this.setValue("cmi.core.lesson_status", "incomplete");
      this.commit();
    }
  },
  getValue: function(name) {
    if (!this.api) return "";
    return this.api.LMSGetValue(name);
  },
  setValue: function(name, value) {
    if (!this.api) return "false";
    return this.api.LMSSetValue(name, value);
  },
  commit: function() {
    if (!this.api) return "false";
    return this.api.LMSCommit("");
  },
  finish: function() {
    if (!this.api) return "false";
    this.api.LMSFinish("");
  },
  complete: function(score, passed) {
    if (!this.api) return;
    this.setValue("cmi.core.score.min", "0");
    this.setValue("cmi.core.score.max", "100");
    this.setValue("cmi.core.score.raw", String(score));
    this.setValue("cmi.core.lesson_status", passed ? "passed" : "completed");
    this.commit();
  }
};
window.addEventListener("load", function(){ scorm.init(); });
window.addEventListener("beforeunload", function(){ scorm.finish(); });
