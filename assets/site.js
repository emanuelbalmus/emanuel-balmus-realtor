(function () {
  "use strict";

  document.documentElement.className =
    document.documentElement.className.replace(/\bno-js\b/, "js");

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) {
    return Array.prototype.slice.call((c || document).querySelectorAll(s));
  };

  /* ---------- Current year ---------- */
  $$(".yr").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Mobile nav ---------- */
  var menuBtn = $("#menuBtn"), navLinks = $("#navLinks");
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---------- Lead form ---------- */
  var form = $("#leadForm");
  if (!form) return;

  var card = $("#formCard"),
      live = $("#formLive"),
      done = $("#formDone"),
      bars = $$(".prog i"),
      stepLabel = $("#stepLabel"),
      steps = $$(".step"),
      branches = $$(".branch"),
      current = 1,
      TOTAL = 3;

  /* Hidden tracking fields */
  try {
    var qs = new URLSearchParams(window.location.search);
    var utm = ["utm_source", "utm_medium", "utm_campaign", "utm_content",
               "utm_term", "gclid", "fbclid"]
      .map(function (k) { var v = qs.get(k); return v ? k + "=" + v : null; })
      .filter(Boolean).join(" | ");
    if ($("#utmField")) $("#utmField").value = utm || "Direct";
    if ($("#srcField")) {
      $("#srcField").value = (document.referrer || "None") + " -> " + location.href;
    }
  } catch (e) { /* tracking is optional */ }

  function park() {
    var top = card.getBoundingClientRect().top;
    if (top < 70 || top > window.innerHeight * 0.55) {
      window.scrollTo({ top: top + window.scrollY - 76, behavior: "smooth" });
    }
  }

  function goto(n) {
    current = n;
    steps.forEach(function (s) { s.classList.toggle("on", +s.dataset.step === n); });
    bars.forEach(function (b, i) { b.classList.toggle("on", i < n); });
    stepLabel.textContent = "Step " + n + " of " + TOTAL;
    park();
  }

  function syncBranches() {
    var picked = $("input[name='Looking To']:checked");
    var keys = picked ? (picked.dataset.branch || "").split(" ") : [];
    branches.forEach(function (b) {
      var show = keys.indexOf(b.dataset.branch) > -1;
      b.hidden = !show;
      $$("input,select,textarea", b).forEach(function (f) { f.disabled = !show; });
    });
  }

  function show(sel) { var e = $(sel); if (e) e.classList.add("on"); }
  function hide(sel) { var e = $(sel); if (e) e.classList.remove("on"); }

  $$("input[name='Looking To']").forEach(function (r) {
    r.addEventListener("change", function () {
      hide("#err1");
      syncBranches();
      setTimeout(function () { goto(2); }, 220);
    });
  });

  $$("input[name='Timeline']").forEach(function (r) {
    r.addEventListener("change", function () { hide("#err2"); });
  });

  $$(".inp").forEach(function (i) {
    i.addEventListener("input", function () {
      i.classList.remove("bad");
      hide("#err3");
    });
  });

  /* US phone formatting */
  var phone = $("#phone");
  if (phone) {
    phone.addEventListener("input", function () {
      var d = phone.value.replace(/\D/g, "").slice(0, 10);
      phone.value = d.length > 6
        ? "(" + d.slice(0, 3) + ") " + d.slice(3, 6) + "-" + d.slice(6)
        : d.length > 3 ? "(" + d.slice(0, 3) + ") " + d.slice(3)
        : d.length ? "(" + d : "";
    });
  }

  function validate(n) {
    if (n === 1) {
      if (!$("input[name='Looking To']:checked")) { show("#err1"); return false; }
      return true;
    }
    if (n === 2) {
      if (!$("input[name='Timeline']:checked")) { show("#err2"); return false; }
      return true;
    }
    var ok = true;
    var fn = $("#fname"), ph = $("#phone"), em = $("#email");
    [[fn, fn.value.trim().length > 1],
     [ph, ph.value.replace(/\D/g, "").length >= 10],
     [em, /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em.value.trim())]
    ].forEach(function (pair) {
      pair[0].classList.toggle("bad", !pair[1]);
      if (!pair[1]) ok = false;
    });
    if (!ok) show("#err3");
    return ok;
  }

  $$("[data-next]").forEach(function (b) {
    b.addEventListener("click", function () {
      if (validate(current)) goto(+b.dataset.next);
    });
  });
  $$("[data-back]").forEach(function (b) {
    b.addEventListener("click", function () { goto(+b.dataset.back); });
  });

  form.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && e.target.tagName !== "TEXTAREA" && current < TOTAL) {
      e.preventDefault();
      if (validate(current)) goto(current + 1);
    }
  });

  syncBranches();

  /* ---------- Submit ---------- */
  var btn = $("#submitBtn");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate(3)) return;
    hide("#errSend");

    var name = ($("#fname").value.trim() + " " + $("#lname").value.trim()).trim();
    var what = $("input[name='Looking To']:checked");
    var when = $("input[name='Timeline']:checked");
    $("#subjField").value = "New lead: " + name +
      " | " + (what ? what.value : "") +
      " | " + (when ? when.value : "");

    var original = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = "Sending\u2026";

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    }).then(function (res) {
      if (!res.ok) throw new Error("bad response");
      live.classList.add("off");
      done.classList.add("on");
      park();
    }).catch(function () {
      btn.disabled = false;
      btn.innerHTML = original;
      show("#errSend");
    });
  });
})();
