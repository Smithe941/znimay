const MQ = '(max-width: 767px)';

const TAB_ORDER = ['home', 'portfolio', 'studio', 'offer', 'contact'] as const;

const HASH_TO_TAB: Record<string, string> = {
  '': 'home',
  '#': 'home',
  '#home': 'home',
  '#hero': 'home',
  '#team': 'portfolio',
  '#studio': 'studio',
  '#services': 'offer',
  '#pricing': 'offer',
  '#contact': 'contact',
};

const TAB_TO_HASH: Record<string, string> = {
  home: '#',
  portfolio: '#team',
  studio: '#studio',
  offer: '#pricing',
  contact: '#contact',
};

type OfferSub = 'pricing' | 'services';

function tabFromHash(hash: string) {
  const key = hash === '#' ? '#' : hash || '';
  return HASH_TO_TAB[key] ?? HASH_TO_TAB[hash] ?? 'home';
}

function offerSubFromHash(hash: string): OfferSub {
  return hash === '#services' ? 'services' : 'pricing';
}

function isSwipeBlockedTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest(
      '[data-locations-track], [data-studio-map], .psv-container, .psv-canvas-container, [data-tour-modal], input, textarea, select, iframe',
    ),
  );
}

/** Mobile-only tab shell. Never mutates layout when viewport ≥ md — desktop snap stays intact. */
export function initMobileTabs() {
  const root = document.querySelector<HTMLElement>('[data-app-root]');
  const tabbar = document.querySelector<HTMLElement>('[data-mobile-tabbar]');
  if (!root || !tabbar) return;

  const mq = window.matchMedia(MQ);
  const panels = Array.from(root.querySelectorAll<HTMLElement>('[data-tab]'));
  const buttons = Array.from(tabbar.querySelectorAll<HTMLButtonElement>('[data-mobile-tab]'));
  const offerStack = root.querySelector<HTMLElement>('[data-offer-stack]');
  const offerTabs = Array.from(
    offerStack?.querySelectorAll<HTMLButtonElement>('[data-offer-tab]') ?? [],
  );
  const offerPanels = Array.from(
    offerStack?.querySelectorAll<HTMLElement>('[data-offer-panel]') ?? [],
  );
  let active = 'home';
  let offerSub: OfferSub = 'pricing';

  function isMobileShell() {
    return mq.matches;
  }

  function setOfferSub(sub: OfferSub, { syncHash = true } = {}) {
    offerSub = sub;
    for (const panel of offerPanels) {
      const on = panel.dataset.offerPanel === sub;
      panel.classList.toggle('is-offer-active', on);
    }
    for (const btn of offerTabs) {
      const on = btn.dataset.offerTab === sub;
      btn.setAttribute('aria-selected', String(on));
      btn.dataset.active = String(on);
      btn.tabIndex = on ? 0 : -1;
    }
    const activePanel = offerPanels.find((panel) => panel.dataset.offerPanel === sub);
    if (activePanel) activePanel.scrollTop = 0;

    if (syncHash && isMobileShell() && active === 'offer') {
      const desired = sub === 'services' ? '#services' : '#pricing';
      if (location.hash !== desired) history.replaceState(null, '', desired);
    }
  }

  function setActive(tabId: string, { syncHash = true, offer }: { syncHash?: boolean; offer?: OfferSub } = {}) {
    if (!isMobileShell()) return;
    if (!panels.some((panel) => panel.dataset.tab === tabId)) return;

    active = tabId;
    root.dataset.activeTab = tabId;
    document.documentElement.dataset.menuHome = tabId === 'home' ? 'true' : 'false';

    for (const panel of panels) {
      const on = panel.dataset.tab === tabId;
      panel.classList.toggle('is-tab-active', on);
      if (on) {
        panel.removeAttribute('hidden');
        panel.scrollTop = 0;
        panel.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
      }
    }

    for (const btn of buttons) {
      const on = btn.dataset.mobileTab === tabId;
      btn.setAttribute('aria-selected', String(on));
      btn.tabIndex = on ? 0 : -1;
      btn.classList.toggle('is-active', on);
    }

    if (tabId === 'offer') {
      setOfferSub(offer ?? offerSubFromHash(location.hash), { syncHash: false });
    }

    if (syncHash) {
      let desired = '';
      if (tabId === 'offer') {
        desired = (offer ?? offerSub) === 'services' ? '#services' : '#pricing';
      } else {
        const nextHash = TAB_TO_HASH[tabId] ?? '#';
        desired = nextHash === '#' ? '' : nextHash;
      }
      if (location.hash !== desired) {
        if (desired) history.replaceState(null, '', desired);
        else history.replaceState(null, '', `${location.pathname}${location.search}`);
      }
    }
  }

  function restoreDesktop() {
    delete document.documentElement.dataset.mobileAppActive;
    delete document.documentElement.dataset.menuHome;
    delete root.dataset.activeTab;
    for (const panel of panels) {
      panel.classList.remove('is-tab-active');
      panel.removeAttribute('hidden');
    }
    for (const btn of buttons) {
      btn.classList.remove('is-active');
      btn.setAttribute('aria-selected', 'false');
      btn.tabIndex = -1;
    }
    for (const panel of offerPanels) {
      panel.classList.remove('is-offer-active');
    }
  }

  function goRelative(delta: number) {
    if (!isMobileShell()) return;
    const idx = TAB_ORDER.indexOf(active as (typeof TAB_ORDER)[number]);
    if (idx < 0) return;
    const next = TAB_ORDER[idx + delta];
    if (!next) return;
    setActive(next, { syncHash: true });
  }

  function onHash() {
    if (!isMobileShell()) return;
    const tabId = tabFromHash(location.hash);
    if (tabId === 'offer') {
      setActive('offer', { syncHash: false, offer: offerSubFromHash(location.hash) });
    } else {
      setActive(tabId, { syncHash: false });
    }
  }

  function onModeChange() {
    if (isMobileShell()) {
      document.documentElement.dataset.mobileAppActive = 'true';
      onHash();
    } else {
      restoreDesktop();
    }
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (!isMobileShell()) return;
      const id = btn.dataset.mobileTab;
      if (id) setActive(id, { syncHash: true });
    });
  });

  offerTabs.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (!isMobileShell()) return;
      const sub = btn.dataset.offerTab;
      if (sub === 'pricing' || sub === 'services') {
        setOfferSub(sub, { syncHash: true });
      }
    });
  });

  document.addEventListener('click', (event) => {
    if (!isMobileShell()) return;
    const target = event.target;
    if (!(target instanceof Element)) return;

    const tourLaunch = target.closest('[data-tour-launch]');
    if (tourLaunch instanceof HTMLElement) {
      event.preventDefault();
      try {
        const orientation = window.DeviceOrientationEvent as typeof DeviceOrientationEvent & {
          requestPermission?: () => Promise<string>;
        };
        if (typeof orientation.requestPermission === 'function') {
          void orientation.requestPermission();
        }
      } catch {
        /* iOS gesture preflight — ignore */
      }
      setActive('studio', { syncHash: true });
      window.setTimeout(() => {
        window.dispatchEvent(new CustomEvent('znimay:tour-open-request'));
      }, 60);
      return;
    }

    const link = target.closest('a[href^="#"]');
    if (!(link instanceof HTMLAnchorElement)) return;
    const hash = link.getAttribute('href') || '';
    const tabId = HASH_TO_TAB[hash];
    if (!tabId) return;
    event.preventDefault();
    if (tabId === 'offer') {
      setActive('offer', { syncHash: true, offer: offerSubFromHash(hash) });
    } else {
      setActive(tabId, { syncHash: true });
    }
  });

  let touchStartX = 0;
  let touchStartY = 0;
  let tracking = false;
  let dragging = false;
  let lockedAxis: 'x' | 'y' | null = null;
  let settleTimer = 0;

  function activePanelEl() {
    return panels.find((panel) => panel.classList.contains('is-tab-active')) ?? null;
  }

  function rubberDx(dx: number) {
    const w = window.innerWidth || 1;
    const idx = TAB_ORDER.indexOf(active as (typeof TAB_ORDER)[number]);
    const atStart = idx <= 0;
    const atEnd = idx >= TAB_ORDER.length - 1;
    if ((atStart && dx > 0) || (atEnd && dx < 0)) {
      // Edge resistance — page still follows finger a little
      return dx * 0.22;
    }
    const capped = Math.max(-w * 0.42, Math.min(w * 0.42, dx));
    return capped;
  }

  function applyFingerDrag(dx: number) {
    const panel = activePanelEl();
    if (!panel) return;
    const w = window.innerWidth || 1;
    const x = rubberDx(dx);
    panel.style.transition = 'none';
    panel.style.willChange = 'transform';
    panel.style.transform = `translate3d(${x}px, 0, 0)`;
    panel.style.opacity = String(1 - Math.min(0.22, Math.abs(x) / w * 0.55));
    root.classList.add('is-tab-dragging');
  }

  function resetPanelMotion(panel: HTMLElement | null) {
    if (!panel) return;
    panel.style.transition = '';
    panel.style.transform = '';
    panel.style.opacity = '';
    panel.style.willChange = '';
  }

  function onceSoon(fn: () => void, ms: number) {
    let ran = false;
    const run = () => {
      if (ran) return;
      ran = true;
      window.clearTimeout(settleTimer);
      fn();
    };
    settleTimer = window.setTimeout(run, ms);
    return run;
  }

  function springBack() {
    const panel = activePanelEl();
    if (!panel) return;
    panel.style.transition =
      'transform 0.32s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.28s ease';
    panel.style.transform = 'translate3d(0, 0, 0)';
    panel.style.opacity = '1';
    const done = onceSoon(() => {
      panel.removeEventListener('transitionend', done);
      resetPanelMotion(panel);
      root.classList.remove('is-tab-dragging');
    }, 360);
    panel.addEventListener('transitionend', done);
  }

  function finishSwipe(direction: 1 | -1) {
    const panel = activePanelEl();
    const w = window.innerWidth || 1;
    if (!panel) {
      root.classList.remove('is-tab-dragging');
      goRelative(direction);
      return;
    }

    // direction 1 = next (swipe left): current exits left, next enters from right
    // direction -1 = prev (swipe right): current exits right, next enters from left
    panel.style.transition =
      'transform 0.26s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.22s ease';
    panel.style.transform = `translate3d(${-direction * w}px, 0, 0)`;
    panel.style.opacity = '0.35';

    const settle = onceSoon(() => {
      panel.removeEventListener('transitionend', settle);
      resetPanelMotion(panel);
      goRelative(direction);
      const next = activePanelEl();
      if (!next) {
        root.classList.remove('is-tab-dragging');
        return;
      }
      next.style.transition = 'none';
      next.style.transform = `translate3d(${direction * w * 0.22}px, 0, 0)`;
      next.style.opacity = '0.88';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          next.style.transition =
            'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.28s ease';
          next.style.transform = 'translate3d(0, 0, 0)';
          next.style.opacity = '1';
          const clear = onceSoon(() => {
            next.removeEventListener('transitionend', clear);
            resetPanelMotion(next);
            root.classList.remove('is-tab-dragging');
          }, 340);
          next.addEventListener('transitionend', clear);
        });
      });
    }, 300);

    panel.addEventListener('transitionend', settle);
  }

  root.addEventListener(
    'touchstart',
    (event) => {
      if (!isMobileShell() || event.touches.length !== 1) return;
      if (document.body.classList.contains('lightbox-open')) return;
      if (document.body.classList.contains('tour-open')) return;
      if (isSwipeBlockedTarget(event.target)) {
        tracking = false;
        return;
      }
      const t = event.touches[0];
      touchStartX = t.clientX;
      touchStartY = t.clientY;
      tracking = true;
      dragging = false;
      lockedAxis = null;
    },
    { passive: true },
  );

  root.addEventListener(
    'touchmove',
    (event) => {
      if (!tracking || !isMobileShell() || event.touches.length !== 1) return;
      const t = event.touches[0];
      const dx = t.clientX - touchStartX;
      const dy = t.clientY - touchStartY;
      if (!lockedAxis) {
        if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
        lockedAxis = Math.abs(dx) > Math.abs(dy) * 1.05 ? 'x' : 'y';
        if (lockedAxis !== 'x') return;
      }
      if (lockedAxis !== 'x') return;

      // Follow the finger
      dragging = true;
      if (event.cancelable) event.preventDefault();
      applyFingerDrag(dx);
    },
    { passive: false },
  );

  root.addEventListener(
    'touchend',
    (event) => {
      if (!tracking || !isMobileShell()) return;
      tracking = false;
      if (lockedAxis !== 'x') {
        lockedAxis = null;
        dragging = false;
        return;
      }
      const t = event.changedTouches[0];
      const dx = t.clientX - touchStartX;
      lockedAxis = null;

      const w = window.innerWidth || 1;
      const shouldSwitch = Math.abs(dx) > Math.min(56, w * 0.14);
      const idx = TAB_ORDER.indexOf(active as (typeof TAB_ORDER)[number]);
      const canGo =
        shouldSwitch &&
        ((dx < 0 && idx < TAB_ORDER.length - 1) || (dx > 0 && idx > 0));

      if (canGo) {
        finishSwipe(dx < 0 ? 1 : -1);
      } else if (dragging) {
        springBack();
      } else {
        root.classList.remove('is-tab-dragging');
        resetPanelMotion(activePanelEl());
      }
      dragging = false;
    },
    { passive: true },
  );

  root.addEventListener(
    'touchcancel',
    () => {
      if (!tracking) return;
      tracking = false;
      lockedAxis = null;
      dragging = false;
      springBack();
    },
    { passive: true },
  );

  window.addEventListener('hashchange', onHash);
  mq.addEventListener('change', onModeChange);
  onModeChange();
}
