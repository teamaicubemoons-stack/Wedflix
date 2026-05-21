import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ============================================================
   GLOBAL STYLES (AUTHENTIC NETFLIX THEME)
   ============================================================ */
const GlobalStyles = () => (
  <style>{`
    @font-face {
      font-family: 'Netflix Sans';
      font-weight: 300;
      src: url('https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Lt.woff2') format('woff2'),
           url('https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Lt.woff') format('woff');
    }

    @font-face {
      font-family: 'Netflix Sans';
      font-weight: 400;
      src: url('https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Rg.woff2') format('woff2'),
           url('https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Rg.woff') format('woff');
    }

    @font-face {
      font-family: 'Netflix Sans';
      font-weight: 500;
      src: url('https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Md.woff2') format('woff2'),
           url('https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Md.woff') format('woff');
    }

    @font-face {
      font-family: 'Netflix Sans';
      font-weight: 700;
      src: url('https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Bd.woff2') format('woff2'),
           url('https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Bd.woff') format('woff');
    }

    @font-face {
      font-family: 'Netflix Sans';
      font-weight: 900;
      src: url('https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Blk.woff2') format('woff2'),
           url('https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Blk.woff') format('woff');
    }

    @font-face {
      font-family: 'Hatolie';
      src: url('https://www.thewedflix.com/fonts/hatolie/Hatolie.woff2') format('woff2'),
           url('https://www.thewedflix.com/fonts/hatolie/Hatolie.woff') format('woff');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body, #root { width: 100%; height: 100%; }
    body {
      background: #141414;
      font-family: 'Netflix Sans', "Helvetica Neue", Helvetica, Arial, sans-serif;
      color: #fff;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }
    ::-webkit-scrollbar { width: 0px; height: 0px; }
    
    button { cursor: pointer; border: none; outline: none; background: none; font-family: inherit; }
    a { text-decoration: none; color: inherit; }

    .row-track { display: flex; gap: 8px; transition: transform 0.4s ease; }

    .card-wrap { position: relative; flex-shrink: 0; width: 300px; }
    .card-wrap:hover { z-index: 50; }

    .card-inner {
      width: 300px; height: 170px;
      border-radius: 8px; overflow: hidden;
      transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease;
      cursor: pointer; position: relative;
      background: #1a1a1a;
      border: 1px solid rgba(255,255,255,0.05);
    }

    .card-wrap:hover .card-inner {
      transform: scale(1.06) translateY(-3%);
      box-shadow: 0 14px 40px rgba(0,0,0,0.85);
      border-radius: 8px 8px 0 0;
      border-color: rgba(255,255,255,0.25);
    }

    .card-title-overlay {
      position: absolute;
      bottom: 22px;
      left: 0;
      right: 0;
      padding: 0 10px;
      text-align: center;
      font-family: 'Hatolie', serif;
      font-size: 22px;
      color: #fff;
      text-transform: uppercase;
      text-shadow: 0 2px 6px rgba(0, 0, 0, 0.95);
      letter-spacing: 1px;
      z-index: 5;
      pointer-events: none;
      line-height: 1.25;
    }
    .card-season-label {
      position: absolute;
      bottom: 7px;
      left: 0;
      right: 0;
      text-align: center;
      font-size: 11px;
      color: rgba(255,255,255,0.65);
      font-weight: 500;
      z-index: 5;
      pointer-events: none;
      letter-spacing: 0.3px;
      font-family: 'Netflix Sans', sans-serif;
    }
    .card-netflix-n {
      position: absolute;
      top: 6px;
      left: 8px;
      z-index: 10;
      font-size: 26px;
      font-weight: 900;
      color: #e50914;
      font-family: 'Netflix Sans', sans-serif;
      pointer-events: none;
      line-height: 1;
      text-shadow: 0 1px 8px rgba(0,0,0,0.7);
    }
    @media (max-width: 768px) {
      .card-wrap { width: 200px; }
      .card-inner { width: 200px; height: 113px; }
      .card-title-overlay { font-size: 16px; bottom: 18px; }
    }

    .card-gradient-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 45%, transparent 75%);
      z-index: 2;
      pointer-events: none;
      transition: background 0.2s ease;
    }
    .card-wrap:hover .card-gradient-overlay {
      background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 45%, transparent 75%);
    }

    .card-popup {
      position: absolute;
      top: calc(100% - 3%);
      left: 50%; transform: translateX(-50%) scaleX(1.06);
      width: 300px;
      background: #181818;
      border-radius: 0 0 8px 8px;
      padding: 10px 12px 12px;
      box-shadow: 0 14px 40px rgba(0,0,0,0.85);
      opacity: 0; pointer-events: none;
      transition: opacity 0.2s ease 0.1s;
      z-index: 60;
      border: 1px solid rgba(255,255,255,0.1);
      border-top: none;
    }
    
    .card-wrap:hover .card-popup {
      opacity: 1; pointer-events: all;
    }

    .popup-btn {
      width: 32px; height: 32px; border-radius: 50%;
      border: 2px solid rgba(255,255,255,0.55) !important;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: border-color 0.15s, background 0.15s;
      background: transparent; color: #fff;
    }
    .popup-btn:hover { border-color: #fff !important; }
    .popup-btn.play { background: #fff; color: #000; border-color: #fff !important; }
    .popup-btn.play:hover { background: rgba(255,255,255,0.8); }

    .nav-link {
      font-size: 14px; color: #e5e5e5; cursor: pointer;
      transition: color 0.15s; white-space: nowrap;
    }
    .nav-link:hover { color: #b3b3b3; }

    .profile-dropdown {
      position: absolute; top: calc(100% + 8px); right: 0;
      background: rgba(0,0,0,0.9);
      border: 1px solid rgba(255,255,255,0.15);
      min-width: 180px; padding: 8px 0;
      opacity: 0; pointer-events: none;
      transition: opacity 0.2s;
    }
    .profile-area:hover .profile-dropdown { opacity: 1; pointer-events: all; }

    .hero-badge-n {
      display: inline-block;
      background: #e50914;
      color: #fff;
      font-size: 10px;
      font-weight: 800;
      padding: 1px 5px;
      border-radius: 2px;
      letter-spacing: 0.5px;
      line-height: 1.6;
    }

    .thumb-img {
      width: 100%; height: 100%;
      object-fit: cover;
    }
    .thumb-label {
      position: absolute; inset: 0;
      display: flex; align-items: center; justify-content: center;
      font-size: 13px; font-weight: 700;
      color: rgba(255,255,255,0.75); text-align: center;
      padding: 10px;
      background: rgba(0, 0, 0, 0.4);
      text-shadow: 0 1px 4px rgba(0,0,0,0.8);
    }
    
    /* Top 10 portrait card */
    .top10-card-inner {
      width: 144px; height: 210px;
      border-radius: 10px; overflow: hidden;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      cursor: pointer; position: relative;
      background: #333; flex-shrink: 0;
      z-index: 1;
    }
    .top10-wrap:hover .top10-card-inner {
      transform: scale(1.18) translateY(-4%);
      box-shadow: 0 16px 48px rgba(0,0,0,0.8);
      border-radius: 10px 10px 0 0;
    }
    .top10-wrap:hover { z-index: 50; }
    .top10-wrap .card-popup {
      width: 200px;
      top: calc(100% - 4%);
      left: calc(50% + 36px);
      transform: translateX(-50%) scaleX(1.18);
    }
    .top10-wrap:hover .card-popup { opacity: 1; pointer-events: all; }

    /* The big number beside the portrait card */
    .top10-number {
      font-size: 190px; font-weight: 800;
      font-family: 'Oswald', sans-serif;
      color: #000000;
      -webkit-text-stroke: 3.5px #595959;
      line-height: 0.8; user-select: none;
      pointer-events: none;
      flex-shrink: 0;
      margin-right: -30px; /* overlap the card significantly */
      margin-left: -5px;
      z-index: 2;
      position: relative;
      align-self: flex-end;
      padding-bottom: 0px;
    }

    .row-section { padding: 0 4%; margin-bottom: 3vw; position: relative; }
    .row-title {
      font-size: 1.4vw; font-weight: 700; color: #e5e5e5;
      margin-bottom: 0.5em; cursor: pointer;
    }
    .row-title:hover { color: #fff; }
    .row-title span { color: #54b3d6; font-size: 0.8em; margin-left: 8px; opacity: 0; transition: opacity 0.2s; vertical-align: middle; }
    .row-section:hover .row-title span { opacity: 1; }

    .arrow-btn {
      position: absolute; top: 50%; transform: translateY(-50%);
      width: 4%; min-width: 32px; height: 100%;
      background: rgba(20,20,20,0.5);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; z-index: 30;
      opacity: 0; transition: opacity 0.2s;
    }
    .row-viewport:hover ~ .arrow-btn,
    .arrow-btn:hover { opacity: 1; }
    .row-viewport { overflow: hidden; }
    .row-viewport:hover + .arrow-right { opacity: 1; }
    .row-section:hover .arrow-btn { opacity: 1; }

    .hero-overlay-gradient {
      position: absolute; inset: 0;
      background:
        linear-gradient(to right, rgba(20,20,20,1) 0%, rgba(20,20,20,0.7) 40%, rgba(20,20,20,0) 65%),
        linear-gradient(to top, rgba(20,20,20,1) 0%, rgba(20,20,20,0.4) 30%, rgba(20,20,20,0) 60%);
    }

    /* Photographer Admin Modal Styles (Sleek Netflix Red & Black edition) */
    .admin-modal {
      position: fixed; inset: 0; z-index: 2000;
      background: rgba(0,0,0,0.85);
      backdrop-filter: blur(5px);
      display: flex; align-items: center; justify-content: center;
      padding: 20px;
    }
    .admin-box {
      width: 100%; max-width: 950px; max-height: 90vh;
      background: #181818; border: 1.5px solid #e50914;
      border-radius: 8px; overflow: hidden;
      box-shadow: 0 10px 40px rgba(0,0,0,0.9);
      display: flex; flexDirection: column;
    }
    .admin-header {
      padding: 16px 24px; background: rgba(229,9,20,0.08);
      border-bottom: 1px solid rgba(229,9,20,0.25);
      display: flex; justify-content: space-between; align-items: center;
    }
    .admin-content {
      display: grid; grid-template-columns: 280px 1fr;
      height: 580px; overflow: hidden;
    }
    .admin-sidebar {
      background: #121212; border-right: 1px solid rgba(255,255,255,0.1);
      padding: 20px 12px; display: flex; flex-direction: column; gap: 8px;
    }
    .admin-menu-btn {
      width: 100%; padding: 12px 16px; border-radius: 4px;
      text-align: left; font-size: 14px; font-weight: 600;
      color: #bbb; transition: all 0.2s; display: flex; align-items: center; gap: 10px;
    }
    .admin-menu-btn:hover { background: rgba(255,255,255,0.05); color: #fff; }
    .admin-menu-btn.active { background: #e50914; color: #fff; font-weight: 700; }
    
    .admin-main {
      padding: 24px; overflow-y: auto; background: #181818;
    }
    .admin-form-group {
      margin-bottom: 16px; display: flex; flex-direction: column; gap: 6px;
    }
    .admin-label { font-size: 13px; font-weight: 600; color: #ccc; letter-spacing: 0.5px; }
    .admin-input, .admin-select {
      background: #282828; border: 1px solid rgba(255,255,255,0.15);
      border-radius: 4px; padding: 10px 14px; color: #fff; font-size: 14px;
      transition: border-color 0.2s;
    }
    .admin-input:focus, .admin-select:focus { border-color: #e50914; outline: none; }
    
    .admin-table {
      width: 100%; border-collapse: collapse; margin-top: 10px;
    }
    .admin-table th {
      text-align: left; padding: 12px; background: rgba(255,255,255,0.03);
      border-bottom: 1px solid rgba(255,255,255,0.1); color: #e50914; font-size: 13px;
    }
    .admin-table td {
      padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 13px;
    }

    /* Header top navbar styles */
    .top-nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      height: 68px; z-index: 1000;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 4%;
      transition: background-color 0.3s ease, box-shadow 0.3s ease;
    }
    .top-nav.scrolled {
      background-color: #141414;
      box-shadow: 0 4px 20px rgba(0,0,0,0.5);
    }
    .top-nav.transparent {
      background: linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%);
    }

    .nav-left { display: flex; align-items: center; gap: 30px; }
    .nav-logo { height: 32px; cursor: pointer; display: block; object-fit: contain; }
    .nav-logo-mobile { height: 28px; cursor: pointer; display: none; object-fit: contain; }
    
    .nav-menu { display: flex; list-style: none; gap: 20px; margin: 0; padding: 0; align-items: center; }
    .nav-menu-item {
      font-size: 14px; font-weight: 400; color: #e5e5e5; cursor: pointer; transition: color 0.2s;
    }
    .nav-menu-item:hover { color: #b3b3b3; }
    .nav-menu-item.active { font-weight: 700; color: #fff; }

    .nav-right { display: flex; align-items: center; gap: 24px; }
    .nav-search-box {
      background: rgba(0,0,0,0.75); border: 1.5px solid #e50914; color: #fff;
      padding: 5px 10px; border-radius: 4px; font-size: 13px; width: 0; opacity: 0;
      outline: none; transition: width 0.3s ease, opacity 0.3s ease, margin-left 0.3s ease;
    }
    .nav-search-box.open { width: 180px; opacity: 1; margin-left: 10px; box-shadow: 0 0 10px rgba(229,9,20,0.3); }

    .nav-profile-area { position: relative; display: flex; align-items: center; gap: 8px; cursor: pointer; }
    .nav-profile-avatar { width: 34px; height: 34px; border-radius: 4px; object-fit: cover; }
    .nav-profile-arrow { transition: transform 0.2s; color: #fff; }
    .nav-profile-area:hover .nav-profile-arrow { transform: rotate(180deg); }

    .nav-profile-dropdown {
      position: absolute; top: calc(100% + 10px); right: 0;
      background: #141414; border: 1px solid rgba(255,255,255,0.15); border-radius: 4px;
      min-width: 180px; padding: 8px 0; box-shadow: 0 8px 30px rgba(0,0,0,0.8);
      z-index: 1010; opacity: 0; pointer-events: none;
      transition: opacity 0.2s ease, transform 0.2s ease;
      transform: translateY(-10px);
    }
    .nav-profile-area:hover .nav-profile-dropdown { opacity: 1; pointer-events: all; transform: translateY(0); }

    .dropdown-btn {
      width: 100%; padding: 10px 16px; text-align: left; font-size: 13px; color: #fff;
      display: flex; align-items: center; gap: 8px; transition: background 0.2s;
    }
    .dropdown-btn:hover { background: rgba(255,255,255,0.08); }
    .dropdown-btn.sign-out { color: #e50914; font-weight: 600; }

    /* Collage Grid Layouts */
    .collage-container {
      display: grid;
      gap: 12px;
      width: 100%;
      max-width: 900px;
      margin: 0 auto;
    }

    .collage-slot {
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      background: #262626;
      border: 2px dashed rgba(255,255,255,0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.25s ease;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    .collage-slot:hover {
      border-color: #e50914;
      background-color: #333;
    }

    .collage-slot.filled {
      border-style: solid;
      border-color: rgba(255,255,255,0.15);
    }

    .collage-slot.active-edit {
      border-color: #e50914;
      box-shadow: 0 0 10px rgba(229,9,20,0.5);
    }

    /* Slot Hover Info overlay */
    .collage-slot-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0.7);
      opacity: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: opacity 0.2s ease;
      color: #fff;
      padding: 8px;
      text-align: center;
      z-index: 5;
    }

    .collage-slot:hover .collage-slot-overlay {
      opacity: 1;
    }

    /* Front-end Layout specifics */
    .mosaic-layout {
      display: grid;
      grid-template-columns: 1.6fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 12px;
      height: 400px;
    }
    .mosaic-slot-1 { grid-column: 1; grid-row: 1 / span 2; }
    .mosaic-slot-2 { grid-column: 2; grid-row: 1; }
    .mosaic-slot-3 { grid-column: 2; grid-row: 2; }

    .portrait-row-layout {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 12px;
      height: 420px;
    }
    .portrait-row-slot-1 { grid-column: 1; }
    .portrait-row-slot-2 { grid-column: 2; }
    .portrait-row-slot-3 { grid-column: 3; }

    .quad-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 12px;
      height: 400px;
    }
    .quad-slot-1 { grid-column: 1; grid-row: 1; }
    .quad-slot-2 { grid-column: 2; grid-row: 1; }
    .quad-slot-3 { grid-column: 1; grid-row: 2; }
    .quad-slot-4 { grid-column: 2; grid-row: 2; }

    .spotlight-layout {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1.6fr 1fr;
      gap: 12px;
      height: 420px;
    }
    .spotlight-slot-1 { grid-column: 1 / span 3; grid-row: 1; }
    .spotlight-slot-2 { grid-column: 1; grid-row: 2; }
    .spotlight-slot-3 { grid-column: 2; grid-row: 2; }
    .spotlight-slot-4 { grid-column: 3; grid-row: 2; }

    @media (max-width: 768px) {
      .nav-menu { display: none; }
      .nav-logo { display: none; }
      .nav-logo-mobile { display: block; }
      .top-nav { height: 56px; }
    }

    /* Photographer Visual Editor Layout Styles */
    .edit-mode-active .editable-visual-element {
      position: relative;
      cursor: pointer !important;
      transition: outline 0.15s ease, filter 0.15s ease;
    }
    .edit-mode-active .editable-visual-element:hover {
      outline: 2px dashed #e50914 !important;
      outline-offset: 2px;
      filter: brightness(1.15) !important;
    }
    .edit-badge {
      display: none;
      position: absolute;
      top: 4px;
      right: 4px;
      background: #e50914;
      color: #fff;
      font-size: 10px;
      font-weight: 800;
      padding: 3px 8px;
      border-radius: 4px;
      z-index: 1000;
      pointer-events: none;
      box-shadow: 0 2px 8px rgba(0,0,0,0.5);
      text-transform: uppercase;
      font-family: 'Netflix Sans', sans-serif;
      letter-spacing: 0.5px;
    }
    .edit-mode-active .editable-visual-element:hover .edit-badge {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    /* Disable links and standard clicks in edit mode to avoid navigation during visual editing */
    .edit-mode-active .editable-visual-element a,
    .edit-mode-active .editable-visual-element button:not(.no-edit-disable) {
      pointer-events: none;
    }
    .edit-mode-active .top-nav {
      top: 72px !important;
    }
  `}</style>
);

/* ============================================================
   AUTHENTIC NETFLIX LOGO
   ============================================================ */
const NetflixLogo = ({ width = 120, height = 36 }) => (
  <img
    src="/netflix-logo.png"
    alt="Netflix"
    style={{ width, height, objectFit: 'contain', display: 'block', flexShrink: 0 }}
  />
);

const AppIcon = ({ type, size = 20, strokeWidth = 2 }) => {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  const icons = {
    couple: (
      <>
        <path d="M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
        <path d="M16 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
        <path d="M3 21v-2a5 5 0 0 1 5-5h0a5 5 0 0 1 5 5v2" />
        <path d="M13 15a5 5 0 0 1 8 4v2" />
      </>
    ),
    family: (
      <>
        <path d="M16 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
        <path d="M8 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        <path d="M2 21v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1" />
        <path d="M14 13h2a6 6 0 0 1 6 6v2" />
      </>
    ),
    guests: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    lock: (
      <>
        <rect x="4" y="10" width="16" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    edit: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </>
    ),
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    camera: (
      <>
        <path d="M14.5 4l-1.3-2h-2.4L9.5 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3.5" />
      </>
    ),
    image: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="8" cy="10" r="1.5" />
        <path d="M21 16l-5-5L5 19" />
      </>
    ),
    chart: (
      <>
        <path d="M3 3v18h18" />
        <path d="M7 15v2" />
        <path d="M12 10v7" />
        <path d="M17 6v11" />
      </>
    ),
    building: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M9 7h1" />
        <path d="M14 7h1" />
        <path d="M9 11h1" />
        <path d="M14 11h1" />
        <path d="M9 15h1" />
        <path d="M14 15h1" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.8 1.8 0 0 0 .36 2l.04.04a2 2 0 1 1-2.83 2.83l-.04-.04a1.8 1.8 0 0 0-2-.36 1.8 1.8 0 0 0-1 1.63V21a2 2 0 1 1-4 0v-.06a1.8 1.8 0 0 0-1-1.63 1.8 1.8 0 0 0-2 .36l-.04.04a2 2 0 1 1-2.83-2.83l.04-.04a1.8 1.8 0 0 0 .36-2 1.8 1.8 0 0 0-1.63-1H3a2 2 0 1 1 0-4h.06a1.8 1.8 0 0 0 1.63-1 1.8 1.8 0 0 0-.36-2l-.04-.04a2 2 0 1 1 2.83-2.83l.04.04a1.8 1.8 0 0 0 2 .36 1.8 1.8 0 0 0 1-1.63V3a2 2 0 1 1 4 0v.06a1.8 1.8 0 0 0 1 1.63 1.8 1.8 0 0 0 2-.36l.04-.04a2 2 0 1 1 2.83 2.83l-.04.04a1.8 1.8 0 0 0-.36 2 1.8 1.8 0 0 0 1.63 1H21a2 2 0 1 1 0 4h-.06a1.8 1.8 0 0 0-1.54 1z" />
      </>
    ),
    folder: (
      <>
        <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </>
    ),
    video: (
      <>
        <rect x="3" y="5" width="14" height="14" rx="2" />
        <path d="M17 9l4-2v10l-4-2" />
      </>
    ),
    trash: (
      <>
        <path d="M3 6h18" />
        <path d="M8 6V4h8v2" />
        <path d="M19 6l-1 14H6L5 6" />
      </>
    ),
    bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7z" />,
    status: <circle cx="12" cy="12" r="6" fill="currentColor" stroke="none" />,
  };

  return <svg {...common}>{icons[type] || icons.image}</svg>;
};

/* ============================================================
   DEFAULT INITIAL MOCK VIDEOS
   ============================================================ */
// Real local videos loaded from public/Video folder
const DEFAULT_VIDEOS = [
  {
    id: 'v1',
    title: 'The Haldi Celebration',
    category: 'Lifestyle & Wellness',
    url: '/Video/video_1.mp4',
    match: 99,
    duration: '03:15',
    isTrending: true,
    isTop10: true,
    rank: 1,
    color: '#8e44ad',
    thumbnail: 'https://images.unsplash.com/photo-1610030474322-261a8ef1bf5c?auto=format&fit=crop&w=600&q=80',
    description: 'A vibrant haldi ceremony filled with yellow hues, laughter, and endless splashing of turmeric water on the happy couple.'
  },
  {
    id: 'v2',
    title: 'Mehndi Candids & Henna Art',
    category: 'Food & Drinks',
    url: '/Video/video_2.mp4',
    match: 98,
    duration: '01:45',
    isTrending: true,
    isTop10: true,
    rank: 2,
    color: '#f39c12',
    thumbnail: 'https://images.unsplash.com/photo-1595152230535-0952d4393047?auto=format&fit=crop&w=600&q=80',
    description: 'Beautiful intricate mehndi designs being drawn on the bride’s hands surrounded by folk music and smiles.'
  },
  {
    id: 'v3',
    title: 'Bridal Glow: Getting Ready',
    category: 'Fashion & Beauty',
    url: '/Video/video_3.mp4',
    match: 100,
    duration: '02:30',
    isTrending: true,
    isTop10: true,
    rank: 3,
    color: '#e50914',
    thumbnail: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80',
    description: 'The elegant prep process highlighting the bride’s makeup, ornaments, and final radiant look before walking down the aisle.'
  },
  {
    id: 'v4',
    title: 'Groom Prep: Suited & Booted',
    category: 'Fashion & Beauty',
    url: '/Video/video_4.mp4',
    match: 96,
    duration: '01:15',
    isTrending: false,
    color: '#2980b9',
    thumbnail: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80',
    description: 'Inside the groom’s suite. Quick highlights of the turban dressing, sherwani adjustments, and emotional moments with the best man.'
  },
  {
    id: 'v5',
    title: 'Royal Feast & Wedding Banquet',
    category: 'Food & Drinks',
    url: '/Video/video_5.mp4',
    match: 95,
    duration: '01:05',
    isTrending: true,
    isTop10: true,
    rank: 4,
    color: '#16a085',
    thumbnail: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    description: 'From gourmet starters to the delicious wedding cake, explore the premium feast prepared for the royal reception night.'
  },
  {
    id: 'v6',
    title: 'Sacred Phere & Seven Vows',
    category: 'Lifestyle & Wellness',
    url: '/Video/video_6.mp4',
    match: 99,
    duration: '05:40',
    isTrending: true,
    isTop10: true,
    rank: 5,
    color: '#f1c40f',
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80',
    description: 'The most sacred part of the wedding. Bridging two lives forever as they walk around the holy fire and exchange their vows.'
  },
  {
    id: 'v7',
    title: 'Sangeet Night Stage Performance',
    category: 'Lifestyle & Wellness',
    url: '/Video/video_7.mp4',
    match: 94,
    duration: '02:10',
    isTrending: false,
    color: '#e74c3c',
    thumbnail: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    description: 'Lights, camera, dance! Sangeet night comes alive with spectacular performances by both families and the beautiful couple.'
  },
  {
    id: 'v8',
    title: 'Cocktail & Dancing Under Stars',
    category: 'Food & Drinks',
    url: '/Video/video_8.mp4',
    match: 97,
    duration: '01:50',
    isTrending: false,
    color: '#34495e',
    thumbnail: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=600&q=80',
    description: 'The celebration continues. Guests dance under the starry night sky with signature drinks and non-stop music.'
  },
  {
    id: 'v9',
    title: 'The Wedding Teaser Highlights',
    category: 'Fashion & Beauty',
    url: '/Video/video_9.mp4',
    match: 98,
    duration: '03:05',
    isTrending: true,
    isTop10: true,
    rank: 6,
    color: '#d35400',
    thumbnail: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=600&q=80',
    description: 'A beautiful cinematic compilation of the entire three-day wedding extravaganza in under three minutes.'
  },
  {
    id: 'v10',
    title: 'The First Look & Reveal',
    category: 'Fashion & Beauty',
    url: '/Video/video_10.mp4',
    match: 95,
    duration: '02:00',
    isTrending: false,
    color: '#e50914',
    thumbnail: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=600&q=80',
    description: 'The heartwarming moment when the couple sees each other for the first time in their wedding attire.'
  },
  {
    id: 'v11',
    title: 'Behind The Scenes: The Shooters',
    category: 'Fashion & Beauty',
    url: '/Video/video_11.mp4',
    match: 93,
    duration: '04:12',
    isTrending: false,
    color: '#2c3e50',
    thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80',
    description: 'A fun documentary compilation showing the photography and cinematography crew running around and catching funny bloopers.'
  }
];

const DEFAULT_EVENT_SETTINGS = {
  coupleName: 'MRUNAL & ANIRUDH',
  weddingDate: '12th December 2026',
  weddingVenue: 'Umaid Bhawan Palace, Jodhpur',
  customGreeting: 'Relive the magical moments, royal ceremonies, and beautiful promises from the wedding celebration of Mrunal and Anirudh.',
  heroVideoUrl: '/Video/video_1.mp4',
};

const DEFAULT_COLLAGE_LAYOUTS = [
  {
    id: 'c1',
    name: 'Layout Album 1: The Magic Vows',
    type: 'mosaic',
    slots: {
      slot1: { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80', caption: 'The First Look' },
      slot2: { url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80', caption: 'Vows Ceremony' },
      slot3: { url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=600&q=80', caption: 'Together Forever' },
    }
  },
  {
    id: 'c2',
    name: 'Layout Album 2: Bridal Spotlight',
    type: 'portrait-row',
    slots: {
      slot1: { url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&h=900&q=80', caption: 'Bridal Portrait' },
      slot2: { url: 'https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&w=600&h=900&q=80', caption: 'The Groom' },
      slot3: { url: 'https://images.unsplash.com/photo-1507504038482-7621006b3ee5?auto=format&fit=crop&w=600&h=900&q=80', caption: 'Beautiful Couple' },
    }
  }
];

/* ============================================================
   SERIES & FILMS DATA (WEDDING NETFLIX STYLE)
   ============================================================ */
const DEFAULT_SERIES = {
  id: 'wedding-series',
  title: 'MRUNAL \u221e ANIRUDH',
  subtitle: 'A Wedding Original',
  description: 'A simple hello turned into a lifetime together. Through laughter, memories, and countless moments, their story found its way to forever.',
  starring: ['The Bride', 'The Groom', 'Families', 'Friends', 'Forever'],
  year: '2026',
  totalSeasons: 3,
  heroVideoUrl: '/Video/video_1.mp4',
  genres: ['Celebration', 'Family', 'Romance'],
  seasons: [
    {
      id: 'season1', title: 'PURE CELEBRATION', seasonNumber: 1,
      subtitle: 'The Kickoff', ageRating: 'U/A 16+',
      thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
      seasonLabel: 'Season 1',
      episodes: [
        { id: 'ep1-1', title: 'Pure Celebration', description: 'Blessings, happiness, and traditions coming together to start the journey with love.', duration: '1m', thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=300&q=80', url: '/Video/video_1.mp4' },
        { id: 'ep1-2', title: 'Laughter Everywhere', description: 'Endless giggles shared between friends and family, turning moments into memories.', duration: '1m', thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=300&q=80', url: '/Video/video_2.mp4' },
        { id: 'ep1-3', title: 'Sacred Vows', description: 'The most heartfelt promises exchanged under a canopy of flowers and family.', duration: '2m', thumbnail: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=300&q=80', url: '/Video/video_3.mp4' },
      ]
    },
    {
      id: 'season2', title: 'LIGHTS COME ALIVE', seasonNumber: 2,
      subtitle: 'The Grand Sangeet', ageRating: 'U/A 16+',
      thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
      seasonLabel: 'Season 2',
      episodes: [
        { id: 'ep2-1', title: 'Dance of Joy', description: 'The sangeet night comes alive with dazzling performances and pure happiness.', duration: '2m', thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=300&q=80', url: '/Video/video_4.mp4' },
        { id: 'ep2-2', title: 'Neon Nights', description: 'Lights, music, and love the perfect night before the big day.', duration: '1m', thumbnail: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=300&q=80', url: '/Video/video_5.mp4' },
      ]
    },
    {
      id: 'season3', title: 'BEFORE FOREVER', seasonNumber: 3,
      subtitle: 'The Wedding Day', ageRating: 'U/A 16+',
      thumbnail: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
      seasonLabel: 'Season 3',
      episodes: [
        { id: 'ep3-1', title: 'The Final Vows', description: 'The most sacred day where two souls become one forever.', duration: '3m', thumbnail: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=300&q=80', url: '/Video/video_6.mp4' },
        { id: 'ep3-2', title: 'Forever Starts Now', description: 'Walking into forever together, with family and love by their side.', duration: '2m', thumbnail: 'https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&w=300&q=80', url: '/Video/video_7.mp4' },
      ]
    },
  ]
};

const LOCAL_MEDIA_DB_NAME = 'wedflix_local_media_db';
const LOCAL_MEDIA_STORE_NAME = 'media';
const LOCAL_MEDIA_REF_PREFIX = 'wedflix-local-media:';

const isDataUrl = (value) => typeof value === 'string' && value.startsWith('data:');
const isBlobUrl = (value) => typeof value === 'string' && value.startsWith('blob:');
const isLocalMediaRef = (value) => typeof value === 'string' && value.startsWith(LOCAL_MEDIA_REF_PREFIX);

const getLocalMediaIdField = (field) => `${field}LocalMediaId`;

const openLocalMediaDb = () => new Promise((resolve, reject) => {
  const request = indexedDB.open(LOCAL_MEDIA_DB_NAME, 1);
  request.onupgradeneeded = () => {
    const db = request.result;
    if (!db.objectStoreNames.contains(LOCAL_MEDIA_STORE_NAME)) {
      db.createObjectStore(LOCAL_MEDIA_STORE_NAME);
    }
  };
  request.onsuccess = () => resolve(request.result);
  request.onerror = () => reject(request.error);
});

const dataUrlToBlob = async (dataUrl) => {
  const response = await fetch(dataUrl);
  return response.blob();
};

const saveLocalMediaDataUrl = async (dataUrl, existingId) => {
  const id = existingId || `media_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const blob = await dataUrlToBlob(dataUrl);
  const db = await openLocalMediaDb();

  await new Promise((resolve, reject) => {
    const tx = db.transaction(LOCAL_MEDIA_STORE_NAME, 'readwrite');
    tx.objectStore(LOCAL_MEDIA_STORE_NAME).put(blob, id);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });

  db.close();
  return id;
};

const loadLocalMediaUrl = async (id) => {
  const db = await openLocalMediaDb();
  const blob = await new Promise((resolve, reject) => {
    const tx = db.transaction(LOCAL_MEDIA_STORE_NAME, 'readonly');
    const request = tx.objectStore(LOCAL_MEDIA_STORE_NAME).get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  db.close();
  return blob ? URL.createObjectURL(blob) : '';
};

const hydrateLocalMediaRefs = async (value) => {
  if (Array.isArray(value)) {
    return Promise.all(value.map(item => hydrateLocalMediaRefs(item)));
  }

  if (!value || typeof value !== 'object') {
    if (isLocalMediaRef(value)) {
      return loadLocalMediaUrl(value.slice(LOCAL_MEDIA_REF_PREFIX.length));
    }
    return value;
  }

  const entries = await Promise.all(
    Object.entries(value).map(async ([key, entryValue]) => [key, await hydrateLocalMediaRefs(entryValue)])
  );
  return Object.fromEntries(entries);
};

const prepareLocalMediaForStorage = async (value) => {
  if (Array.isArray(value)) {
    return Promise.all(value.map(item => prepareLocalMediaForStorage(item)));
  }

  if (!value || typeof value !== 'object') return value;

  const prepared = {};
  for (const [key, entryValue] of Object.entries(value)) {
    if (isDataUrl(entryValue)) {
      const mediaIdField = getLocalMediaIdField(key);
      const mediaId = await saveLocalMediaDataUrl(entryValue, value[mediaIdField]);
      prepared[key] = `${LOCAL_MEDIA_REF_PREFIX}${mediaId}`;
      prepared[mediaIdField] = mediaId;
    } else if (isBlobUrl(entryValue) && value[getLocalMediaIdField(key)]) {
      prepared[key] = `${LOCAL_MEDIA_REF_PREFIX}${value[getLocalMediaIdField(key)]}`;
    } else {
      prepared[key] = await prepareLocalMediaForStorage(entryValue);
    }
  }
  return prepared;
};

const DEFAULT_FILMS = [
  { id: 'film1', title: 'PRE-WEDDING FILM', seasonLabel: '', thumbnail: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80', url: '/Video/video_8.mp4', color: '#8e44ad', duration: '5:00', match: 99, description: 'The romantic pre-wedding story capturing their love and chemistry.', category: 'Films' },
  { id: 'film2', title: 'THE PROPOSAL', seasonLabel: '', thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80', url: '/Video/video_9.mp4', color: '#e50914', duration: '3:00', match: 99, description: 'The beautiful moment when he got down on one knee.', category: 'Films' },
  { id: 'film3', title: 'HIGHLIGHT OF THE WEDDING', seasonLabel: '', thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80', url: '/Video/video_10.mp4', color: '#e74c3c', duration: '8:00', match: 100, description: 'The best of the best from the magical wedding day.', category: 'Films' },
];


/* ============================================================
   MULTI-TENANT SEED DATABASE & WORKSPACE DICTIONARY
   ============================================================ */
const INITIAL_TENANTS = {
  'mrunal-anirudh': {
    slug: 'mrunal-anirudh',
    eventSettings: {
      coupleName: 'MRUNAL & ANIRUDH',
      weddingDate: '12th December 2026',
      weddingVenue: 'Umaid Bhawan Palace, Jodhpur',
      customGreeting: 'Relive the magical moments, royal ceremonies, and beautiful promises from the wedding celebration of Mrunal and Anirudh.',
      heroVideoUrl: '/Video/video_1.mp4',
      accessPin: '1111',
      status: 'ACTIVE',
      expiryDate: '2026-12-31',
      storageLimitGb: 200,
      storageUsedGb: 45.2,
      coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    },
    weddingVideos: DEFAULT_VIDEOS,
    collageLayouts: DEFAULT_COLLAGE_LAYOUTS,
    weddingSeries: DEFAULT_SERIES
  },
  'riya-karan': {
    slug: 'riya-karan',
    eventSettings: {
      coupleName: 'RIYA & KARAN',
      weddingDate: '18th November 2026',
      weddingVenue: 'Taj Lake Palace, Udaipur',
      customGreeting: 'Relive the majestic lake-side vows, emotional pheras, and royal celebrations of Riya and Karan from Udaipur.',
      heroVideoUrl: '/Video/video_2.mp4',
      accessPin: '2222',
      status: 'ACTIVE',
      expiryDate: '2026-11-30',
      storageLimitGb: 150,
      storageUsedGb: 32.8,
      coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    },
    weddingVideos: DEFAULT_VIDEOS.map(v => ({ ...v, id: `rk_${v.id}` })),
    collageLayouts: DEFAULT_COLLAGE_LAYOUTS.map(c => ({ ...c, id: `rk_${c.id}` })),
    weddingSeries: {
      ...DEFAULT_SERIES,
      id: 'wedding-series-rk',
      title: 'RIYA \u221e KARAN',
      seasons: DEFAULT_SERIES.seasons.map(s => ({
        ...s,
        id: `rk_${s.id}`,
        episodes: s.episodes.map(ep => ({ ...ep, id: `rk_${ep.id}` }))
      }))
    }
  },
  'sharma-family': {
    slug: 'sharma-family',
    eventSettings: {
      coupleName: 'SHARMA FAMILY REUNION',
      weddingDate: '5th October 2026',
      weddingVenue: 'The Oberoi Rajvilas, Jaipur',
      customGreeting: 'Celebrate family heritage, emotional milestones, and grand reunion moments with the Sharma Family.',
      heroVideoUrl: '/Video/video_3.mp4',
      accessPin: '3333',
      status: 'ACTIVE',
      expiryDate: '2027-01-15',
      storageLimitGb: 300,
      storageUsedGb: 88.5,
      coverImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80',
    },
    weddingVideos: DEFAULT_VIDEOS.map(v => ({ ...v, id: `sf_${v.id}` })),
    collageLayouts: DEFAULT_COLLAGE_LAYOUTS.map(c => ({ ...c, id: `sf_${c.id}` })),
    weddingSeries: {
      ...DEFAULT_SERIES,
      id: 'wedding-series-sf',
      title: 'SHARMA FAMILY REUNION',
      seasons: DEFAULT_SERIES.seasons.map(s => ({
        ...s,
        id: `sf_${s.id}`,
        episodes: s.episodes.map(ep => ({ ...ep, id: `sf_${ep.id}` }))
      }))
    }
  }
};

/* ============================================================
   SCREEN 2.1: WEDFLIX CLIENT SHOWCASE HUB (PORTAL SELECTION)
   ============================================================ */
const ClientShowcaseScreen = ({ tenantsList, onSelectClient, onOpenAdminLogin }) => {
  return (
    <div style={{
      width: '100vw', minHeight: '100vh', background: '#141414',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '40px 4% 80px', fontFamily: '"Netflix Sans", sans-serif',
      position: 'relative', overflowY: 'auto'
    }}>
      {/* Upper Brand Nav */}
      <div style={{
        width: '100%', maxWidth: 1200, display: 'flex',
        justifyContent: 'space-between', alignItems: 'center', marginBottom: 60
      }}>
        <div onClick={onOpenAdminLogin} style={{ cursor: 'pointer' }}>
          <NetflixLogo width={140} height={42} />
        </div>
        <button
          onClick={onOpenAdminLogin}
          style={{
            background: '#e50914', color: '#fff', padding: '8px 18px',
            borderRadius: 4, fontWeight: 700, fontSize: 13,
            transition: 'background 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#b81d24'}
          onMouseLeave={e => e.currentTarget.style.background = '#e50914'}
        >
          Photographer Login
        </button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 48, maxWidth: 650 }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800,
          color: '#fff', marginBottom: 12, fontFamily: 'Hatolie, serif',
          letterSpacing: '1px'
        }}>
          WEDFLIX ORIGINAL STREAM SHOWCASES
        </h1>
        <p style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)', color: '#aaa', lineHeight: 1.5 }}>
          Select a couple's private cinematic streaming space to experience their beautiful stories, highlight reels, and custom wedding series in premium VOD style.
        </p>
      </div>

      {/* Grid of client workspaces */}
      <div style={{
        display: 'flex', gap: 32, flexWrap: 'wrap',
        justifyContent: 'center', width: '100%', maxWidth: 1200
      }}>
        {tenantsList.map((client) => {
          const isSuspended = client.eventSettings.status === 'SUSPENDED';
          return (
            <motion.div
              key={client.slug}
              whileHover={isSuspended ? {} : { scale: 1.04, y: -4 }}
              onClick={() => {
                if (!isSuspended) onSelectClient(client.slug);
              }}
              style={{
                width: 320, height: 420, borderRadius: 12,
                overflow: 'hidden', background: '#1c1c1c',
                border: isSuspended ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.5)', cursor: isSuspended ? 'not-allowed' : 'pointer',
                position: 'relative', display: 'flex', flexDirection: 'column'
              }}
            >
              {/* Background Poster */}
              <div style={{
                height: 200, width: '100%',
                backgroundImage: `url(${client.eventSettings.coverImage || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80'})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                position: 'relative', filter: isSuspended ? 'grayscale(100%) opacity(40%)' : 'none'
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom, transparent 40%, rgba(28,28,28,1) 100%)'
                }} />
                {/* Netflix N Badge */}
                <div style={{
                  position: 'absolute', top: 12, left: 16,
                  color: '#e50914', fontSize: 28, fontWeight: 900,
                  textShadow: '0 2px 8px rgba(0,0,0,0.8)'
                }}>N</div>
                
                {/* Status Badges */}
                {isSuspended && (
                  <div style={{
                    position: 'absolute', top: 16, right: 16,
                    background: '#e50914', color: '#fff', fontSize: 10,
                    fontWeight: 800, padding: '4px 8px', borderRadius: 4,
                    textTransform: 'uppercase', letterSpacing: '0.5px'
                  }}>
                    Suspended
                  </div>
                )}
              </div>

              {/* Text Area */}
              <div style={{
                padding: '16px 20px 24px', display: 'flex',
                flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between'
              }}>
                <div>
                  <h3 style={{
                    fontSize: 22, fontWeight: 800, color: isSuspended ? '#555' : '#fff',
                    fontFamily: 'Hatolie, serif', letterSpacing: '0.5px', marginBottom: 6,
                    textTransform: 'uppercase'
                  }}>
                    {client.eventSettings.coupleName}
                  </h3>
                  <div style={{
                    display: 'flex', gap: 10, fontSize: 12,
                    color: isSuspended ? '#444' : '#e50914', fontWeight: 700, marginBottom: 12
                  }}>
                    <span>{client.eventSettings.weddingDate}</span>
                    <span style={{ color: '#555' }}>|</span>
                    <span>{client.eventSettings.weddingVenue.split(',')[1] || client.eventSettings.weddingVenue}</span>
                  </div>
                  <p style={{
                    fontSize: 12, color: isSuspended ? '#444' : '#999',
                    lineHeight: 1.45, display: '-webkit-box', WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical', overflow: 'hidden'
                  }}>
                    {client.eventSettings.customGreeting}
                  </p>
                </div>

                {!isSuspended && (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    color: '#e50914', fontSize: 13, fontWeight: 700, marginTop: 12
                  }}>
                    <span>Enter Private Space</span>
                    <span style={{ fontSize: 16 }}>→</span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <p style={{ color: '#444', fontSize: 11, marginTop: 100 }}>
        © 2026 Wedflix Premium Event Stream Portals. Powered by VOD Edge CDN.
      </p>
    </div>
  );
};

/* ============================================================
   SCREEN 2.2: PRIVATE SPACE CLIENT PIN ACCESS LOCK SHIELD
   ============================================================ */
const ClientPinLockScreen = ({ eventSettings, onSubmitPin, onBack }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleKeyPress = (num) => {
    if (pin.length < 4) {
      const nextPin = pin + num;
      setPin(nextPin);
      setError(false);
      if (nextPin.length === 4) {
        if (nextPin === eventSettings.accessPin) {
          onSubmitPin();
        } else {
          setShake(true);
          setTimeout(() => setShake(false), 500);
          setError(true);
          setPin('');
        }
      }
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
    setError(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9') {
        handleKeyPress(e.key);
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Escape') {
        onBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 4000,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', fontFamily: '"Netflix Sans", sans-serif',
      background: '#141414', overflow: 'hidden'
    }}>
      {/* Blurred background cover image of the wedding */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${eventSettings.coverImage || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'blur(30px) brightness(15%)', transform: 'scale(1.15)', zIndex: 1
      }} />

      {/* Lock UI container */}
      <div style={{
        position: 'relative', zIndex: 5, width: '100%', maxWidth: 450,
        padding: '40px 32px', textAlign: 'center', display: 'flex',
        flexDirection: 'column', alignItems: 'center',
        transform: shake ? 'translateX(10px)' : 'none',
        transition: shake ? 'transform 0.05s alternate' : 'transform 0.2s',
      }}>
        {/* Profile Avatar Card with Netflix Lock Styling */}
        <div style={{
          width: 140, height: 140, background: '#e50914',
          borderRadius: 8, display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: 64, boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
          position: 'relative', marginBottom: 24, border: '2px solid rgba(255,255,255,0.1)'
        }}>
          <AppIcon type="couple" size={70} strokeWidth={1.6} />
          <div style={{
            position: 'absolute', bottom: -10, right: -10,
            width: 44, height: 44, borderRadius: '50%', background: '#141414',
            border: '2px solid rgba(255,255,255,0.2)', display: 'flex',
            alignItems: 'center', justifyCenter: 'center', fontSize: 18,
            color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center'
          }}>
            <AppIcon type="lock" size={20} />
          </div>
        </div>

        <h2 style={{
          fontSize: 24, fontWeight: 800, color: '#fff',
          fontFamily: 'Hatolie, serif', letterSpacing: '0.5px', marginBottom: 8,
          textTransform: 'uppercase'
        }}>
          {eventSettings.coupleName}
        </h2>
        <p style={{ fontSize: 14, color: '#aaa', marginBottom: 32, lineHeight: 1.5 }}>
          This streaming space is password-protected.<br />
          Enter the 4-digit PIN to access their wedding original series.
        </p>

        {/* 4 Pin indicators */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              style={{
                width: 22, height: 22, borderRadius: '50%',
                background: pin.length > idx ? '#fff' : 'rgba(255,255,255,0.1)',
                border: pin.length > idx ? '2px solid #e50914' : '2px solid rgba(255,255,255,0.15)',
                transition: 'all 0.1s ease',
                boxShadow: pin.length > idx ? '0 0 10px rgba(229,9,20,0.6)' : 'none'
              }}
            />
          ))}
        </div>

        {error && (
          <p style={{ color: '#e50914', fontSize: 13, fontWeight: 700, marginTop: 12 }}>
            Incorrect PIN. Please try again.
          </p>
        )}

        {/* Back Button */}
        <button
          onClick={onBack}
          style={{
            marginTop: 48, color: '#888', fontSize: 13,
            fontWeight: 600, transition: 'color 0.2s', display: 'flex',
            alignItems: 'center', gap: 8
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = '#888'}
        >
          <span>←</span> Back to Showcases
        </button>
      </div>

      {/* Embedded Pinpad on bottom for mobile touch ease */}
      <div style={{
        position: 'relative', zIndex: 5, display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px 24px',
        maxWidth: 280, margin: '20px auto 0'
      }}>
        {[1,2,3,4,5,6,7,8,9].map(num => (
          <button
            key={num}
            onClick={() => handleKeyPress(num.toString())}
            style={{
              width: 60, height: 60, borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff', fontSize: 20, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.15s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
          >
            {num}
          </button>
        ))}
        <div />
        <button
          onClick={() => handleKeyPress('0')}
          style={{
            width: 60, height: 60, borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff', fontSize: 20, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.15s'
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
        >
          0
        </button>
        <button
          onClick={handleBackspace}
          style={{
            width: 60, height: 60, borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff', fontSize: 16, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.15s'
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
        >
          ⌫
        </button>
      </div>
    </div>
  );
};

/* ============================================================
   SCREEN 2.3: PORTAL SUSPENDED OR EXPIRED PROTECTION WARNING SCREEN
   ============================================================ */
const SpaceWarningScreen = ({ eventSettings, type = 'SUSPENDED', onOpenLogin, onBack }) => {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 4500,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', fontFamily: '"Netflix Sans", sans-serif',
      background: '#141414', overflow: 'hidden'
    }}>
      {/* Blurred background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${eventSettings?.coverImage || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'blur(30px) brightness(12%)', transform: 'scale(1.15)', zIndex: 1
      }} />

      <div style={{
        position: 'relative', zIndex: 5, width: '90%', maxWidth: 550,
        background: 'rgba(20, 20, 20, 0.85)', border: '1.5px solid #e50914',
        borderRadius: 12, padding: '40px 32px', textAlign: 'center',
        boxShadow: '0 15px 50px rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}>
        {/* Warning Indicator */}
        <div style={{
          width: 70, height: 70, borderRadius: '50%', background: 'rgba(229,9,20,0.1)',
          border: '2.5px solid #e50914', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: 32, color: '#e50914', marginBottom: 24,
          boxShadow: '0 0 15px rgba(229,9,20,0.3)'
        }}>
          ⚠️
        </div>

        <h1 style={{
          fontSize: 28, fontWeight: 900, color: '#fff',
          fontFamily: 'Hatolie, serif', letterSpacing: '1px', marginBottom: 12,
          textTransform: 'uppercase'
        }}>
          {type === 'SUSPENDED' ? 'STREAMING SPACE SUSPENDED' : 'STREAMING SPACE EXPIRED'}
        </h1>
        
        <h3 style={{ fontSize: 16, color: '#e50914', fontWeight: 700, marginBottom: 20, textTransform: 'uppercase' }}>
          {eventSettings?.coupleName || 'PRIVATE EVENT'}
        </h3>

        <p style={{ fontSize: 14, color: '#ccc', marginBottom: 28, lineHeight: 1.6, maxWidth: 450 }}>
          {type === 'SUSPENDED' 
            ? 'This showcase stream has been temporarily suspended by the streaming administrator. Please contact your photographer to reactivate the cinematic event portal.'
            : `This private showcase space expired on ${eventSettings?.expiryDate || 'N/A'}. All media streaming limits have been paused. Please contact your photographer for a renewal upgrade.`}
        </p>

        {/* Contact Info Widget */}
        <div style={{
          width: '100%', background: 'rgba(255,255,255,0.04)', borderRadius: 6,
          padding: '16px 20px', marginBottom: 32, border: '1px solid rgba(255,255,255,0.06)',
          textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 6
        }}>
          <div style={{ fontSize: 11, color: '#777', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>Photographer Contact</div>
          <div style={{ fontSize: 14, color: '#fff', fontWeight: 600 }}>Wedflix Premium Media & Cinematography Inc.</div>
          <div style={{ fontSize: 13, color: '#aaa' }}>Support: <a href="mailto:support@thewedflix.com" style={{ color: '#e50914', textDecoration: 'underline' }}>support@thewedflix.com</a></div>
          <div style={{ fontSize: 12, color: '#777', marginTop: 4 }}>
            Venue: {eventSettings?.weddingVenue || 'Unknown'} | Date: {eventSettings?.weddingDate || 'Unknown'}
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: 16, width: '100%', justifyContent: 'center' }}>
          <button
            onClick={onBack}
            style={{
              padding: '10px 20px', borderRadius: 4, background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontWeight: 600,
              fontSize: 13, transition: 'all 0.2s', flex: 1
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
          >
            ← Back to Showcases
          </button>
          
          <button
            onClick={onOpenLogin}
            style={{
              padding: '10px 20px', borderRadius: 4, background: '#e50914',
              color: '#fff', fontWeight: 700, fontSize: 13,
              transition: 'background 0.2s', flex: 1
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#b81d24'}
            onMouseLeave={e => e.currentTarget.style.background = '#e50914'}
          >
            🔑 Partner Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   SCREEN 1: AUTHENTIC NETFLIX INTRO VIDEO
   ============================================================ */
const IntroScreen = ({ onComplete }) => {
  const videoRef = useRef(null);
  const [fadeOut, setFadeOut] = useState(false);

  const handleEnd = useCallback(() => {
    setFadeOut(true);
    setTimeout(() => onComplete(), 600);
  }, [onComplete]);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.play().catch(() => { vid.muted = true; vid.play().catch(() => {}); });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 0.6 }}
      onClick={handleEnd}
      style={{ position: 'fixed', inset: 0, background: '#000', zIndex: 9999, cursor: 'pointer' }}
    >
      <video
        ref={videoRef}
        src="/netflix-intro.mp4"
        onEnded={handleEnd}
        playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </motion.div>
  );
};

/* ============================================================
   SCREEN 2: WHO'S WATCHING (ROLES SELECTOR)
   ============================================================ */
const ProfileScreen = ({ coupleName, onSelect }) => {
  const PROFILES = [
    { id: 'couple', name: 'Bride & Groom', icon: 'couple', color: '#1A6B3A', role: 'couple' },
    { id: 'bride_fam', name: "Bride's Family", icon: 'family', color: '#1A3A6B', role: 'family' },
    { id: 'groom_fam', name: "Groom's Family", icon: 'family', color: '#4A1A6B', role: 'family' },
    { id: 'guests', name: 'Friends & Guests', icon: 'guests', color: '#6B2A1A', role: 'guest' },
  ];

  return (
    <motion.div
      key="profiles"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed', inset: 0, background: '#141414',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 48
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 400 }}
      >
        Who's Watching?
      </motion.h1>
      
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
        {PROFILES.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            onClick={() => onSelect(p)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, cursor: 'pointer' }}
          >
            <motion.div
              whileHover={{ scale: 1.06, borderColor: '#fff' }}
              style={{
                width: 160, height: 160,
                background: p.color,
                borderRadius: 4,
                border: '3px solid transparent',
                transition: 'border-color 0.15s',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 72, overflow: 'hidden',
              }}
            >
              <AppIcon type={p.icon} size={78} strokeWidth={1.6} />
            </motion.div>
            <span style={{ fontSize: '1.1rem', color: '#999', transition: 'color 0.15s', fontWeight: 500 }}>
              {p.name}
            </span>
          </motion.div>
        ))}
      </div>
      
      <div style={{ height: 20 }} />
    </motion.div>
  );
};

/* ============================================================
   VISUAL EDITOR HELPER COMPONENTS
   ============================================================ */
const PinLoginScreen = ({ onSuccess, onCancel, tenants = {}, activeSlug }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleKeyPress = (num) => {
    if (pin.length < 4) {
      const nextPin = pin + num;
      setPin(nextPin);
      setError(false);
      if (nextPin.length === 4) {
        if (nextPin === '8888') {
          onSuccess('super_admin');
        } else if (nextPin === '4321') {
          onSuccess('photographer');
        } else {
          // Check if this matches the active client access PIN (e.g. 1111, 2222) to unlock it directly
          const activeTenant = tenants[activeSlug];
          if (activeTenant && nextPin === activeTenant.eventSettings.accessPin) {
            onSuccess('client', activeSlug);
          } else {
            setShake(true);
            setTimeout(() => setShake(false), 500);
            setError(true);
            setPin('');
          }
        }
      }
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
    setError(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9') {
        handleKeyPress(e.key);
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Escape') {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin]);

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)',
      zIndex: 5000, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', fontFamily: '"Netflix Sans", sans-serif'
    }}>
      <div style={{
        width: '100%', maxWidth: 420, padding: 32, borderRadius: 12,
        background: '#141414', border: '1px solid rgba(255,255,255,0.08)',
        textAlign: 'center', boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
        transform: shake ? 'translateX(10px)' : 'none',
        transition: shake ? 'transform 0.05s alternate' : 'transform 0.2s',
      }}>
        <span style={{ color: '#e50914', display: 'inline-flex', marginBottom: 12 }}>
          <AppIcon type="lock" size={48} strokeWidth={1.6} />
        </span>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 6 }}>Photographer Sign In</h2>
        <p style={{ fontSize: 13, color: '#888', marginBottom: 24 }}>Enter your secure 4-digit PIN to access visual edit mode.</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 20 }}>
          {[0, 1, 2, 3].map(idx => {
            const isFilled = pin.length > idx;
            return (
              <div
                key={idx}
                style={{
                  width: 24, height: 24, borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.3)',
                  background: isFilled ? '#e50914' : 'transparent',
                  transition: 'background 0.15s, transform 0.1s',
                  transform: isFilled ? 'scale(1.15)' : 'none',
                  boxShadow: isFilled ? '0 0 10px #e50914' : 'none'
                }}
              />
            );
          })}
        </div>

        {error && (
          <p style={{ fontSize: 13, color: '#e50914', fontWeight: 600, marginBottom: 20 }}>
            ❌ Invalid PIN. Please try again. (Hint: 4321 or 8888)
          </p>
        )}
        {!error && <div style={{ height: 20, marginBottom: 20 }} />}

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16, maxWidth: 280, margin: '0 auto 24px'
        }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <button
              key={num}
              onClick={() => handleKeyPress(num.toString())}
              style={{
                width: 60, height: 60, borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)', color: '#fff',
                fontSize: 22, fontWeight: 700, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.1)',
                margin: '0 auto', transition: 'background 0.15s, transform 0.1s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
            >
              {num}
            </button>
          ))}
          <button
            onClick={onCancel}
            style={{
              fontSize: 12, color: '#aaa', fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => handleKeyPress('0')}
            style={{
              width: 60, height: 60, borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)', color: '#fff',
              fontSize: 22, fontWeight: 700, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.1)',
              margin: '0 auto', transition: 'background 0.15s, transform 0.1s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
          >
            0
          </button>
          <button
            onClick={handleBackspace}
            style={{
              fontSize: 20, color: '#aaa', display: 'flex',
              alignItems: 'center', justifyContent: 'center'
            }}
          >
            ⌫
          </button>
        </div>
      </div>
    </div>
  );
};

const EditorIcon = ({ type, size = 18 }) => {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  const icons = {
    tools: (
      <>
        <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 0 0 5.4-5.4" />
        <path d="M15 6l3 3" />
        <path d="M17 4l3 3" />
      </>
    ),
    video: (
      <>
        <rect x="3" y="5" width="14" height="14" rx="2" />
        <path d="M17 9l4-2v10l-4-2" />
        <path d="M8 9l4 3-4 3z" fill="currentColor" stroke="none" />
      </>
    ),
    collage: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M8 4v16" />
        <path d="M3 11h18" />
        <path d="M14 11v9" />
      </>
    ),
    series: (
      <>
        <rect x="4" y="5" width="16" height="12" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <path d="M8 9h8" />
        <path d="M8 13h5" />
      </>
    ),
    episode: (
      <>
        <rect x="4" y="5" width="16" height="14" rx="2" />
        <path d="M8 9h8" />
        <path d="M8 13h5" />
        <path d="M16 13l2 2-2 2" />
      </>
    ),
    discard: (
      <>
        <path d="M18 6L6 18" />
        <path d="M6 6l12 12" />
      </>
    ),
    save: (
      <>
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
        <path d="M17 21v-8H7v8" />
        <path d="M7 3v5h8" />
      </>
    ),
  };

  return <svg {...common}>{icons[type]}</svg>;
};

const EditorActionButton = ({ label, icon, variant = 'primary', onClick }) => {
  const variants = {
    primary: { background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)' },
    danger: { background: '#8d0007', color: '#fff', border: '1px solid rgba(255,255,255,0.18)' },
    save: { background: '#fff', color: '#e50914', border: '1px solid #fff' },
  };

  return (
    <button
      onClick={onClick}
      className="no-edit-disable"
      title={label}
      aria-label={label}
      style={{
        ...variants[variant],
        width: variant === 'save' || variant === 'danger' ? 54 : 46,
        height: variant === 'save' || variant === 'danger' ? 46 : 44,
        padding: 0,
        borderRadius: 6,
        fontSize: 0,
        fontWeight: 800,
        lineHeight: 1,
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        transition: 'background 0.15s ease, transform 0.15s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-1px)';
        e.currentTarget.style.background = variant === 'save' ? '#f2f2f2' : variant === 'danger' ? '#7f0006' : 'rgba(255,255,255,0.2)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.background = variants[variant].background;
      }}
    >
      <span style={{ display: 'inline-flex', flex: '0 0 auto' }}>{icon}</span>
    </button>
  );
};

const VisualEditorBar = ({ onSave, onDiscard, onAddVideo, onAddCollage, onAddSeason, onAddEpisode }) => {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: 72,
      background: 'linear-gradient(180deg, #f40612 0%, #d9040f 100%)', color: '#fff', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      padding: '0 4%', zIndex: 3500, fontFamily: '"Netflix Sans", sans-serif',
      boxShadow: '0 8px 24px rgba(0,0,0,0.42)', borderBottom: '1px solid rgba(0,0,0,0.35)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: 1760,
        display: 'grid',
        gridTemplateColumns: 'minmax(380px, 1fr) auto auto auto',
        alignItems: 'center',
        gap: 22,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, minWidth: 0 }}>
          <span style={{
            width: 46,
            height: 46,
            borderRadius: 7,
            background: 'rgba(0,0,0,0.24)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(255,255,255,0.18)',
            flex: '0 0 auto',
          }}>
            <EditorIcon type="tools" size={22} />
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
            <span style={{ fontWeight: 900, fontSize: 22, textTransform: 'uppercase', letterSpacing: '0px', lineHeight: 1, whiteSpace: 'nowrap' }}>
              Photographer Visual Editor
            </span>
            <span style={{ color: 'rgba(255,255,255,0.82)', fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap' }}>
              Professional draft workspace
            </span>
          </div>
        </div>

        <div style={{
          background: 'rgba(0,0,0,0.26)',
          border: '1px solid rgba(255,255,255,0.16)',
          fontSize: 13,
          lineHeight: 1.2,
          padding: '9px 16px',
          borderRadius: 6,
          fontWeight: 900,
          minWidth: 280,
        }}>
          Draft Mode Active
          <span style={{ display: 'block', color: 'rgba(255,255,255,0.76)', fontWeight: 700, marginTop: 3 }}>
            Click page elements below to edit
          </span>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
        }}>
          <EditorActionButton label="Add Video Clip" onClick={onAddVideo} icon={<EditorIcon type="video" />} />
          <EditorActionButton label="Create Collage Album" onClick={onAddCollage} icon={<EditorIcon type="collage" />} />
          <EditorActionButton label="Add Series/Season" onClick={onAddSeason} icon={<EditorIcon type="series" />} />
          <EditorActionButton label="Add Episode" onClick={onAddEpisode} icon={<EditorIcon type="episode" />} />
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 10,
          paddingLeft: 20,
          borderLeft: '1px solid rgba(255,255,255,0.26)',
        }}>
          <EditorActionButton label="Discard & Exit" onClick={onDiscard} icon={<EditorIcon type="discard" />} variant="danger" />
          <EditorActionButton label="Save Changes" onClick={onSave} icon={<EditorIcon type="save" />} variant="save" />
        </div>
      </div>
    </div>
  );
};

const SectionEditorModal = ({ selectedElement, onSave, onClose, seasons = [] }) => {
  const [formData, setFormData] = useState({});
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (selectedElement) {
      setFormData(selectedElement.data || {});
    }
  }, [selectedElement]);

  const handleFieldChange = (key, val) => {
    setFormData(prev => ({ ...prev, [key]: val }));
  };

  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const mediaId = await saveLocalMediaDataUrl(reader.result, formData[getLocalMediaIdField(key)]);
        const objectUrl = await loadLocalMediaUrl(mediaId);
        setFormData(prev => ({
          ...prev,
          [key]: objectUrl,
          [getLocalMediaIdField(key)]: mediaId
        }));
      } catch (error) {
        console.error('Failed to save uploaded file locally:', error);
        alert("This file could not be saved in the browser. Please use a hosted URL or a file from the public/Video folder.");
      } finally {
        setUploading(false);
      }
    };
    reader.onerror = () => {
      alert("Error reading file.");
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  if (!selectedElement) return null;

  const { type } = selectedElement;

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
      zIndex: 4500, display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: 20, fontFamily: '"Netflix Sans", sans-serif'
    }}>
      <div style={{
        background: '#181818', border: '1px solid #333',
        borderRadius: 12, padding: 24, width: '100%', maxWidth: 500,
        boxShadow: '0 10px 30px rgba(0,0,0,0.8)', color: '#fff',
        maxHeight: '90vh', overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, borderBottom: '1px solid #2a2a2a', paddingBottom: 10 }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: '#e50914', display: 'flex', alignItems: 'center', gap: 8 }}>
            <AppIcon type="edit" size={18} /> Edit Website Section
          </h3>
          <button onClick={onClose} style={{ color: '#aaa', fontSize: 20 }}>&times;</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
          {type === 'new-season' && (
            <>
              <div className="admin-form-group">
                <label className="admin-label">Season/Series Title</label>
                <input
                  type="text"
                  placeholder="e.g. SANGEET DANCE DRAMA"
                  value={formData.title || ''}
                  onChange={e => handleFieldChange('title', e.target.value)}
                  className="admin-input"
                  required
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Season Label</label>
                <input
                  type="text"
                  placeholder="e.g. Season 4"
                  value={formData.seasonLabel || ''}
                  onChange={e => handleFieldChange('seasonLabel', e.target.value)}
                  className="admin-input"
                  required
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Subtitle</label>
                <input
                  type="text"
                  placeholder="e.g. The Dance Face-off"
                  value={formData.subtitle || ''}
                  onChange={e => handleFieldChange('subtitle', e.target.value)}
                  className="admin-input"
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Age Rating</label>
                <select
                  value={formData.ageRating || 'U/A 16+'}
                  onChange={e => handleFieldChange('ageRating', e.target.value)}
                  className="admin-select"
                >
                  <option value="U/A 13+">U/A 13+</option>
                  <option value="U/A 16+">U/A 16+</option>
                  <option value="A">A (Adults Only)</option>
                  <option value="U">U (Universal)</option>
                </select>
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Thumbnail Image URL</label>
                <input
                  type="text"
                  value={formData.thumbnail || ''}
                  onChange={e => handleFieldChange('thumbnail', e.target.value)}
                  className="admin-input"
                  placeholder="https://..."
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Or Upload Thumbnail Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleFileChange(e, 'thumbnail')}
                  style={{ color: '#aaa', fontSize: 13 }}
                />
                {uploading && <div style={{ color: '#e50914', fontSize: 11, marginTop: 4 }}>Uploading image...</div>}
                {formData.thumbnail && (
                  <img
                    src={formData.thumbnail}
                    alt="Preview"
                    style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 4, marginTop: 8, border: '1px solid #333' }}
                  />
                )}
              </div>
            </>
          )}

          {type === 'new-episode' && (
            <>
              <div className="admin-form-group">
                <label className="admin-label">Select Season / Series</label>
                <select
                  value={formData.seasonIdx !== undefined ? formData.seasonIdx : 0}
                  onChange={e => handleFieldChange('seasonIdx', Number(e.target.value))}
                  className="admin-select"
                >
                  {seasons.map((s, idx) => (
                    <option key={s.id} value={idx}>{s.seasonLabel || `Season ${idx+1}`} — {s.title}</option>
                  ))}
                </select>
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Episode Title</label>
                <input
                  type="text"
                  placeholder="e.g. Sangeet Grand Entry"
                  value={formData.title || ''}
                  onChange={e => handleFieldChange('title', e.target.value)}
                  className="admin-input"
                  required
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Duration</label>
                <input
                  type="text"
                  placeholder="e.g. 3m"
                  value={formData.duration || '2m'}
                  onChange={e => handleFieldChange('duration', e.target.value)}
                  className="admin-input"
                  required
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Episode Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe the highlight moment..."
                  value={formData.description || ''}
                  onChange={e => handleFieldChange('description', e.target.value)}
                  className="admin-input"
                  style={{ resize: 'none', fontFamily: 'inherit' }}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Thumbnail URL</label>
                <input
                  type="text"
                  value={formData.thumbnail || ''}
                  onChange={e => handleFieldChange('thumbnail', e.target.value)}
                  className="admin-input"
                  placeholder="https://..."
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Or Upload Thumbnail Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleFileChange(e, 'thumbnail')}
                  style={{ color: '#aaa', fontSize: 13 }}
                />
                {uploading && <div style={{ color: '#e50914', fontSize: 11, marginTop: 4 }}>Uploading image...</div>}
                {formData.thumbnail && (
                  <img
                    src={formData.thumbnail}
                    alt="Preview"
                    style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 4, marginTop: 8, border: '1px solid #333' }}
                  />
                )}
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Episode Video URL</label>
                <input
                  type="text"
                  value={formData.url || ''}
                  onChange={e => handleFieldChange('url', e.target.value)}
                  className="admin-input"
                  placeholder="/Video/video_1.mp4 or YouTube link"
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Or Upload Local Video Clip</label>
                <input
                  type="file"
                  accept="video/mp4"
                  onChange={e => handleFileChange(e, 'url')}
                  style={{ color: '#aaa', fontSize: 13 }}
                />
              </div>
            </>
          )}

          {type === 'navbar-meta' && (
            <>
              <div className="admin-form-group">
                <label className="admin-label">Couple Names</label>
                <input
                  type="text"
                  value={formData.coupleName || ''}
                  onChange={e => handleFieldChange('coupleName', e.target.value)}
                  className="admin-input"
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Wedding Date</label>
                <input
                  type="text"
                  value={formData.weddingDate || ''}
                  onChange={e => handleFieldChange('weddingDate', e.target.value)}
                  className="admin-input"
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Celebration Venue</label>
                <input
                  type="text"
                  value={formData.weddingVenue || ''}
                  onChange={e => handleFieldChange('weddingVenue', e.target.value)}
                  className="admin-input"
                />
              </div>
            </>
          )}

          {type === 'hero' && (
            <>
              <div className="admin-form-group">
                <label className="admin-label">Wedding Film Title</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={e => handleFieldChange('title', e.target.value)}
                  className="admin-input"
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Subheading (Greeting)</label>
                <input
                  type="text"
                  value={formData.customGreeting || ''}
                  onChange={e => handleFieldChange('customGreeting', e.target.value)}
                  className="admin-input"
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="admin-form-group">
                  <label className="admin-label">Match Score (%)</label>
                  <input
                    type="number"
                    min="50"
                    max="100"
                    value={formData.matchScore || '99'}
                    onChange={e => handleFieldChange('matchScore', e.target.value)}
                    className="admin-input"
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Location tag</label>
                  <input
                    type="text"
                    value={formData.locationTag || ''}
                    onChange={e => handleFieldChange('locationTag', e.target.value)}
                    className="admin-input"
                  />
                </div>
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Description Text</label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={e => handleFieldChange('description', e.target.value)}
                  className="admin-input"
                  style={{ resize: 'none', fontFamily: 'inherit' }}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Background Video Source URL</label>
                <input
                  type="text"
                  value={formData.heroVideoUrl || ''}
                  onChange={e => handleFieldChange('heroVideoUrl', e.target.value)}
                  className="admin-input"
                  placeholder="https://..."
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Or Upload Local Trailer (.mp4)</label>
                <input
                  type="file"
                  accept="video/mp4"
                  onChange={e => handleFileChange(e, 'heroVideoUrl')}
                  style={{ color: '#aaa', fontSize: 13 }}
                />
                {uploading && <div style={{ color: '#e50914', fontSize: 11, marginTop: 4 }}>Reading file data... Please wait...</div>}
              </div>
            </>
          )}

          {(type === 'card' || type === 'new-video') && (
            <>
              <div className="admin-form-group">
                <label className="admin-label">Moment Title</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={e => handleFieldChange('title', e.target.value)}
                  className="admin-input"
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="admin-form-group">
                  <label className="admin-label">Category</label>
                  <select
                    value={formData.category || 'Fashion & Beauty'}
                    onChange={e => handleFieldChange('category', e.target.value)}
                    className="admin-select"
                  >
                    <option value="Fashion & Beauty">Fashion & Beauty</option>
                    <option value="Food & Drinks">Food & Drinks</option>
                    <option value="Lifestyle & Wellness">Lifestyle & Wellness</option>
                  </select>
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Accent Color</label>
                  <select
                    value={formData.color || '#e50914'}
                    onChange={e => handleFieldChange('color', e.target.value)}
                    className="admin-select"
                  >
                    <option value="#e50914">Signature Red</option>
                    <option value="#2980b9">Royal Blue</option>
                    <option value="#27ae60">Garden Green</option>
                    <option value="#8e44ad">Midnight Purple</option>
                    <option value="#f39c12">Haldi Gold</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="admin-form-group">
                  <label className="admin-label">Duration</label>
                  <input
                    type="text"
                    value={formData.duration || '05:00'}
                    onChange={e => handleFieldChange('duration', e.target.value)}
                    className="admin-input"
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Love Match Score (%)</label>
                  <input
                    type="number"
                    value={formData.match || '98'}
                    onChange={e => handleFieldChange('match', e.target.value)}
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Thumbnail URL</label>
                <input
                  type="text"
                  value={formData.thumbnail || ''}
                  onChange={e => handleFieldChange('thumbnail', e.target.value)}
                  className="admin-input"
                  placeholder="https://..."
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Or Upload Thumbnail Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleFileChange(e, 'thumbnail')}
                  style={{ color: '#aaa', fontSize: 13 }}
                />
                {uploading && <div style={{ color: '#e50914', fontSize: 11, marginTop: 4 }}>Uploading image...</div>}
                {formData.thumbnail && (
                  <img
                    src={formData.thumbnail}
                    alt="Preview"
                    style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 4, marginTop: 8, border: '1px solid #333' }}
                  />
                )}
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Play Video URL</label>
                <input
                  type="text"
                  value={formData.url || ''}
                  onChange={e => handleFieldChange('url', e.target.value)}
                  className="admin-input"
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Or Upload Local Video Clip</label>
                <input
                  type="file"
                  accept="video/mp4"
                  onChange={e => handleFileChange(e, 'url')}
                  style={{ color: '#aaa', fontSize: 13 }}
                />
              </div>
            </>
          )}

          {type === 'collage-slot' && (
            <>
              <div className="admin-form-group">
                <label className="admin-label">Photo Caption</label>
                <input
                  type="text"
                  value={formData.caption || ''}
                  onChange={e => handleFieldChange('caption', e.target.value)}
                  className="admin-input"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Photo Image URL</label>
                <input
                  type="text"
                  value={formData.url || ''}
                  onChange={e => handleFieldChange('url', e.target.value)}
                  className="admin-input"
                  placeholder="https://..."
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Or Upload Photo Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleFileChange(e, 'url')}
                  style={{ color: '#aaa', fontSize: 13 }}
                />
                {uploading && <div style={{ color: '#e50914', fontSize: 11, marginTop: 4 }}>Uploading image...</div>}
                {formData.url && (
                  <img
                    src={formData.url}
                    alt="Preview"
                    style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 4, marginTop: 8, border: '1px solid #333' }}
                  />
                )}
              </div>
            </>
          )}

          {(type === 'new-collage' || type === 'edit-collage-meta') && (
            <>
              <div className="admin-form-group">
                <label className="admin-label">Collage Album Name</label>
                <input
                  type="text"
                  placeholder="e.g. Sangeet Moments"
                  value={formData.name || ''}
                  onChange={e => handleFieldChange('name', e.target.value)}
                  className="admin-input"
                  required
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Layout Grid Type</label>
                <select
                  value={formData.type || 'mosaic'}
                  onChange={e => handleFieldChange('type', e.target.value)}
                  className="admin-select"
                >
                  <option value="mosaic">Mosaic Grid (1 large, 2 small)</option>
                  <option value="portrait-row">Portrait Columns (3 portrait columns)</option>
                  <option value="quad">Symmetrical Quad (4 square cards)</option>
                  <option value="spotlight">Spotlight Grid (1 focus spotlight left, 3 small right)</option>
                </select>
              </div>
            </>
          )}

          {type === 'card' && (
            <div style={{ marginTop: 12, borderTop: '1px dashed rgba(255,255,255,0.15)', paddingTop: 12, display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete this video clip from staging?")) {
                    onSave({ _deleteVideoId: selectedElement.key });
                  }
                }}
                style={{
                  background: 'rgba(229, 9, 20, 0.1)', color: '#e50914', border: '1px solid rgba(229, 9, 20, 0.3)',
                  padding: '6px 12px', borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: 'pointer'
                }}
              >
                <span style={{ display: 'inline-flex', verticalAlign: 'middle', marginRight: 6 }}><AppIcon type="trash" size={13} /></span>
                Delete Video Clip
              </button>
            </div>
          )}

          {type === 'edit-collage-meta' && (
            <div style={{ marginTop: 12, borderTop: '1px dashed rgba(255,255,255,0.15)', paddingTop: 12, display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete this entire collage album from staging?")) {
                    onSave({ _deleteCollageId: selectedElement.key });
                  }
                }}
                style={{
                  background: 'rgba(229, 9, 20, 0.1)', color: '#e50914', border: '1px solid rgba(229, 9, 20, 0.3)',
                  padding: '6px 12px', borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: 'pointer'
                }}
              >
                <span style={{ display: 'inline-flex', verticalAlign: 'middle', marginRight: 6 }}><AppIcon type="trash" size={13} /></span>
                Delete Collage Album
              </button>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 12, borderTop: '1px solid #2a2a2a', paddingTop: 16 }}>
          <button
            onClick={onClose}
            style={{
              flex: 1, background: 'rgba(255,255,255,0.08)', color: '#fff',
              padding: '10px 16px', borderRadius: 4, fontWeight: 600, fontSize: 13
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            style={{
              flex: 2, background: '#e50914', color: '#fff',
              padding: '10px 16px', borderRadius: 4, fontWeight: 800,
              fontSize: 13, boxShadow: '0 4px 10px rgba(229,9,20,0.3)'
            }}
          >
            Update Staging
          </button>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   NAVBAR (THEWEDFLIX RESPONSIVE WEB THEME)
   ============================================================ */
const Navbar = ({ scrolled, activeSection, setActiveSection, profile, onSwitchProfile, onOpenAdmin, searchQuery, setSearchQuery, onOpenEditorLogin, isEditMode }) => {
  const [searchOpen, setSearchOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'seasons', label: 'Seasons' },
    { id: 'films', label: 'Our Films' },
    { id: 'moments', label: 'Little Moments' },
  ];

  return (
    <nav className={`top-nav ${scrolled ? 'scrolled' : 'transparent'}`}>
      {/* Left side: Custom Logo and Main Menu */}
      <div className="nav-left">
        {/* Widescreen Logo */}
        <img
          src="/netflix-logo-custom.svg"
          alt="Wedflix"
          className="nav-logo"
          onClick={() => {
            setActiveSection('home');
            if (!isEditMode) onOpenEditorLogin();
          }}
        />
        {/* Mobile Logo */}
        <img
          src="/netflix-N-logo-custom.svg"
          alt="Wedflix"
          className="nav-logo-mobile"
          onClick={() => {
            setActiveSection('home');
            if (!isEditMode) onOpenEditorLogin();
          }}
        />

        <ul className="nav-menu">
          {menuItems.map(item => (
            <li key={item.id}>
              <span
                onClick={() => setActiveSection(item.id)}
                className={`nav-menu-item ${activeSection === item.id ? 'active' : ''}`}
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right side: Search, Profile Menu */}
      <div className="nav-right">
        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <button
            onClick={() => {
              setSearchOpen(!searchOpen);
              setActiveSection('search');
            }}
            style={{ padding: 4, color: '#fff', display: 'flex', alignItems: 'center' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          <input
            type="text"
            placeholder="Search moments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`nav-search-box ${(searchOpen || activeSection === 'search') ? 'open' : ''}`}
            autoFocus={activeSection === 'search'}
          />
        </div>

        {/* Profile Dropdown Area */}
        <div className="nav-profile-area">
          <img
            src="/assets/ProfileIconImg.png"
            onError={(e) => { e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'; }}
            alt="Profile"
            className="nav-profile-avatar"
          />
          <svg
            width="10" height="6" viewBox="0 0 10 6" fill="none" className="nav-profile-arrow"
          >
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          {/* Profile Dropdown Menu */}
          <div className="nav-profile-dropdown">
            {profile && (
              <div style={{ padding: '8px 16px', fontSize: 12, borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#888', display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span>Active Profile:</span>
                <strong style={{ color: '#fff' }}>{profile.name}</strong>
              </div>
            )}
            


            <button
              className="dropdown-btn sign-out"
              onClick={(e) => { e.stopPropagation(); onSwitchProfile(null); }}
            >
              <span>🚪</span> Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

/* ============================================================
   HERO SECTION (100% NETFLIX THEME)
   ============================================================ */
const HeroSection = ({ settings, onPlay, onMoreInfo, isEditMode, onEditClick }) => {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div style={{ position: 'relative', width: '100%', height: '56.25vw', maxHeight: '95vh', minHeight: 500, overflow: 'hidden' }}>
      {/* Background — Cinematic Obsidian Ambient & Video */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, #0f0f0f 0%, #151515 40%, #1a1a1a 70%, #0c0c0c 100%)',
      }}>
        {settings.heroVideoUrl && (
          <video
            src={settings.heroVideoUrl}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.6,
              zIndex: 1,
            }}
          />
        )}

        {/* Cinematic pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(ellipse at 75% 35%, rgba(229,9,20,0.15) 0%, transparent 60%)',
          zIndex: 2,
        }} />

      </div>

      {/* Gradient overlays */}
      <div className="hero-overlay-gradient" />

      {/* Hero content */}
      <div
        className={isEditMode ? "editable-visual-element" : ""}
        onClick={isEditMode ? () => onEditClick({ type: 'hero', key: 'hero', data: settings }) : undefined}
        style={{
          position: 'absolute', left: '4%', bottom: '25%',
          maxWidth: 600, display: 'flex', flexDirection: 'column', gap: 16, zIndex: 10,
        }}
      >
        {isEditMode && <div className="edit-badge"><AppIcon type="edit" size={10} /> Edit Hero Section</div>}

        {/* A WEDDING ORIGINAL badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span style={{ color: '#fff', fontSize: 11, fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', opacity: 0.85 }}>A WEDDING ORIGINAL</span>
        </motion.div>

        {/* Couple name in Hatolie font */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 style={{
            fontFamily: 'Hatolie, serif',
            fontSize: 'clamp(2.8rem, 5vw, 5rem)',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '2px',
            textShadow: '2px 4px 20px rgba(0,0,0,0.7)',
            color: '#fff',
          }}>
            {settings.coupleName}
          </h1>
        </motion.div>

        {/* N badge + #1 Love in Every Frame */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <span className="hero-badge-n" style={{ fontSize: 10, padding: '1px 5px' }}>N</span>
          <span style={{ color: '#fff', fontSize: 14, fontWeight: 700 }}>#1 Love In Every Frame</span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{ color: '#cccccc', fontSize: 'clamp(12px, 1.1vw, 15px)', lineHeight: 1.6, maxWidth: 460 }}
        >
          {settings.customGreeting || 'A simple hello turned into a lifetime together. Through laughter, memories, and countless moments, their story found its way to forever.'}
        </motion.p>

        {/* Genre tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          style={{ display: 'flex', alignItems: 'center', fontSize: 13, color: '#ccc' }}
        >
          <span>Celebration</span>
          <span style={{ margin: '0 10px', opacity: 0.5 }}>•</span>
          <span>Family</span>
          <span style={{ margin: '0 10px', opacity: 0.5 }}>•</span>
          <span>Romance</span>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          style={{ display: 'flex', gap: 12, alignItems: 'center' }}
        >
          <button
            onClick={() => onPlay({ title: `${settings.coupleName} - The Wedding Film`, url: settings.heroVideoUrl })}
            style={{
              background: '#fff', color: '#000',
              padding: '9px 26px', borderRadius: 4,
              fontSize: '1rem', fontWeight: 700,
              display: 'flex', alignItems: 'center', gap: 8,
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.75)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>
            Play
          </button>

          <button
            onClick={onMoreInfo}
            style={{
              background: 'rgba(109,109,110,0.7)', color: '#fff',
              padding: '9px 22px', borderRadius: 4,
              fontSize: '1rem', fontWeight: 700,
              display: 'flex', alignItems: 'center', gap: 8,
              transition: 'background 0.15s', cursor: 'pointer', border: 'none',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(109,109,110,0.9)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(109,109,110,0.7)'; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
            More Info
          </button>
        </motion.div>
      </div>

      {/* Mute/Unmute Toggle Button */}
      {settings.heroVideoUrl && (
        <button
          onClick={() => setIsMuted(!isMuted)}
          style={{
            position: 'absolute',
            right: '4%',
            bottom: '25%',
            zIndex: 20,
            background: 'rgba(0,0,0,0.5)',
            border: '1.5px solid rgba(255,255,255,0.4)',
            color: '#fff',
            padding: 8,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            width: 44,
            height: 44,
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.borderColor = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0,0,0,0.5)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
          }}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM12 4L9.91 6.09 12 8.18V4zm-6.41.09L4.5 5.18 8.82 9.5H3v5h4l5 5v-6.82l4.8 4.8c-.8.56-1.73.96-2.8 1.12v2.01c1.61-.22 3.09-.89 4.31-1.85l2.7 2.7 1.09-1.09L5.59 4.09z" />
            </svg>
          ) : (
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>
      )}

      {/* Bottom fade to bg */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '25%', background: 'linear-gradient(to top, #141414, transparent)', zIndex: 5 }} />
    </div>
  );
};

/* ============================================================
   SHARED REUSABLE CARD POPUP OVERLAY
   ============================================================ */
const CardPopup = ({ show, onPlay, isFavorite, onToggleFavorite, onMoreInfo }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="card-popup">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <button className="popup-btn play" onClick={onPlay} title="Play Video">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>
          </button>
          <button className="popup-btn" onClick={onToggleFavorite} title={isFavorite ? 'Remove from List' : 'Add to My List'}>
            {isFavorite
              ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#e50914" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
              : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            }
          </button>
          <button className="popup-btn" onClick={() => setLiked(v => !v)} title="Love this moment">
            <svg width="13" height="13" viewBox="0 0 24 24" fill={liked ? '#e50914' : 'none'} stroke={liked ? '#e50914' : 'currentColor'} strokeWidth="2">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
          <button className="popup-btn" onClick={onMoreInfo} title="More Info">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>
        <div style={{ color: '#fff', fontSize: 11, fontWeight: '700', border: '1px solid rgba(255,255,255,0.4)', padding: '0px 4px', borderRadius: 3 }}>
          {show.duration}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 4 }}>
        <span style={{ color: '#46d369', fontSize: 12, fontWeight: 700 }}>{show.match}% Match</span>
        <span style={{ border: '1px solid rgba(255,255,255,0.4)', color: 'rgba(255,255,255,0.6)', fontSize: 10, padding: '0 3px', lineHeight: '15px' }}>HD</span>
      </div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>{show.category}</div>
    </div>
  );
};

/* ============================================================
   LANDSCAPE CONTENT CARDS (NETFLIX STYLE)
   ============================================================ */
const ContentCard = ({ show, onPlay, myList = [], onToggleFavorite, isEditMode, onEditClick, onMoreInfo }) => {
  const [hovered, setHovered] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  return (
    <div
      className="card-wrap"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`card-inner ${isEditMode ? 'editable-visual-element' : ''}`}
        onClick={isEditMode ? (e) => { e.stopPropagation(); onEditClick({ type: 'card', key: show.id, data: show }); } : () => onPlay(show)}
      >
        {isEditMode && <div className="edit-badge" style={{ fontSize: 8, padding: '2px 5px' }}><AppIcon type="edit" size={8} /> Edit</div>}
        {/* Netflix N logo */}
        <span className="card-netflix-n">N</span>
        <div style={{ width: '100%', height: '100%', position: 'relative', background: '#333' }}>
          {show.thumbnail && !imgFailed ? (
            <img
              className="thumb-img"
              src={show.thumbnail}
              alt={show.title}
              onError={() => setImgFailed(true)}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${show.color || '#e50914'} 0%, #1e1e1e 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
          )}
          <div className="card-gradient-overlay" />
          <div className="card-title-overlay">{show.title}</div>
          {show.seasonLabel && <div className="card-season-label">{show.seasonLabel}</div>}
        </div>
        {show.progress > 0 && (
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 3, background: '#555', zIndex: 6 }}>
            <div style={{ width: `${show.progress}%`, height: '100%', background: '#e50914' }} />
          </div>
        )}
      </div>
      {!isEditMode && (
        <CardPopup
          show={show}
          onPlay={() => onPlay(show)}
          isFavorite={myList.some(v => v.id === show.id)}
          onToggleFavorite={() => onToggleFavorite(show)}
          onMoreInfo={() => onMoreInfo?.(show)}
        />
      )}
    </div>
  );
};

/* ============================================================
   TOP 10 PORTRAIT CARDS
   ============================================================ */
const Top10Card = ({ show, index, onPlay, myList = [], onToggleFavorite, isEditMode, onEditClick, onMoreInfo }) => {
  const [hovered, setHovered] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  return (
    <div
      className="top10-wrap"
      style={{
        flexShrink: 0,
        display: 'flex',
        alignItems: 'flex-end',
        position: 'relative',
        cursor: 'pointer',
        zIndex: 100 - index 
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Big rank number */}
      <span className="top10-number">{index + 1}</span>

      {/* Portrait card */}
      <div
        className={`top10-card-inner ${isEditMode ? 'editable-visual-element' : ''}`}
        onClick={isEditMode ? (e) => { e.stopPropagation(); onEditClick({ type: 'card', key: show.id, data: show }); } : () => onPlay(show)}
      >
        {isEditMode && <div className="edit-badge" style={{ fontSize: 8, padding: '2px 5px' }}><AppIcon type="edit" size={8} /> Edit</div>}
        <div style={{ width: '100%', height: '100%', position: 'relative', background: '#333' }}>
          {show.thumbnail && !imgFailed ? (
            <img 
              className="thumb-img" 
              src={show.thumbnail} 
              alt={show.title} 
              onError={() => setImgFailed(true)} 
            />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              background: `linear-gradient(160deg, ${show.color || '#e50914'} 0%, rgba(30,30,30,0.9) 60%, #000 100%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }} />
          )}
          <div className="card-gradient-overlay" />
          <div className="card-title-overlay">{show.title}</div>
        </div>
      </div>

      {/* Popup */}
      {!isEditMode && (
        <CardPopup
          show={show}
          onPlay={() => onPlay(show)}
          isFavorite={myList.some(v => v.id === show.id)}
          onToggleFavorite={() => onToggleFavorite(show)}
          onMoreInfo={() => onMoreInfo?.(show)}
        />
      )}
    </div>
  );
};

/* ============================================================
   CONTENT ROWS CAROUSEL
   ============================================================ */
const ContentRow = ({ title, shows, isTop10 = false, onPlay, myList = [], onToggleFavorite, isEditMode, onEditClick, onMoreInfo }) => {
  const [offset, setOffset] = useState(0);
  const trackRef = useRef(null);

  const cardW = isTop10 ? 210 : 308;
  const visibleCount = Math.floor(window.innerWidth * 0.92 / cardW);
  const maxOffset = Math.max(0, shows.length - visibleCount);

  const prev = () => setOffset(o => Math.max(0, o - visibleCount));
  const next = () => setOffset(o => Math.min(maxOffset, o + visibleCount));

  const translateX = -(offset * cardW);

  if (shows.length === 0) return null;

  return (
    <div className="row-section">
      <h2 className="row-title">
        {title}
        <span>Explore All &rsaquo;</span>
      </h2>
      <div style={{ position: 'relative' }}>
        {/* Left arrow */}
        {offset > 0 && (
          <button className="arrow-btn" onClick={prev} style={{ left: '-4%' }}>
            <svg width="24" height="44" viewBox="0 0 24 44" fill="none" stroke="white" strokeWidth="2.5">
              <polyline points="18,4 6,22 18,40" />
            </svg>
          </button>
        )}

        <div className="row-viewport">
          <div
            ref={trackRef}
            className="row-track"
            style={{ transform: `translateX(${translateX}px)`, alignItems: isTop10 ? 'flex-end' : 'stretch', gap: isTop10 ? '0px' : '4px' }}
          >
            {shows.map((show, i) => (
              isTop10
                ? <Top10Card key={show.id || i} show={show} index={i} onPlay={onPlay} myList={myList} onToggleFavorite={onToggleFavorite} isEditMode={isEditMode} onEditClick={onEditClick} onMoreInfo={onMoreInfo} />
                : <ContentCard key={show.id || i} show={show} onPlay={onPlay} myList={myList} onToggleFavorite={onToggleFavorite} isEditMode={isEditMode} onEditClick={onEditClick} onMoreInfo={onMoreInfo} />
            ))}
          </div>
        </div>

        {/* Right arrow */}
        {offset < maxOffset && (
          <button className="arrow-btn" onClick={next} style={{ right: '-4%' }}>
            <svg width="24" height="44" viewBox="0 0 24 44" fill="none" stroke="white" strokeWidth="2.5">
              <polyline points="6,4 18,22 6,40" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

/* ============================================================
   PHOTOGRAPHER ADMIN CONSOLE (AUTHENTIC NETFLIX THEME)
   ============================================================ */
const AdminPanel = ({
  videos,
  eventSettings,
  onSaveSettings,
  onAddVideo,
  onDeleteVideo,
  onEditVideo,
  collageLayouts: initialCollages,
  onSaveCollages,
  onClose,
  role = 'photographer',
  tenants = {},
  onUpdateTenants,
  activeSlug,
  onSwitchActiveSlug
}) => {
  const [activeTab, setActiveTab] = useState(role === 'super_admin' ? 'super-analytics' : 'settings');
  
  // Settings State
  const [coupleName, setCoupleName] = useState(eventSettings.coupleName || '');
  const [weddingDate, setWeddingDate] = useState(eventSettings.weddingDate || '');
  const [weddingVenue, setWeddingVenue] = useState(eventSettings.weddingVenue || '');
  const [customGreeting, setCustomGreeting] = useState(eventSettings.customGreeting || '');
  const [heroVideoUrl, setHeroVideoUrl] = useState(eventSettings.heroVideoUrl || '');
  const [accessPin, setAccessPin] = useState(eventSettings.accessPin || '1111');
  const [expiryDate, setExpiryDate] = useState(eventSettings.expiryDate || '2026-12-31');
  const [coverImage, setCoverImage] = useState(eventSettings.coverImage || '');

  // Collage States
  const [collageLayouts, setCollageLayouts] = useState(initialCollages || []);
  const [selectedCollageId, setSelectedCollageId] = useState(initialCollages?.[0]?.id || '');
  const [editingCollageType, setEditingCollageType] = useState(initialCollages?.[0]?.type || 'mosaic');
  const [editingSlots, setEditingSlots] = useState(initialCollages?.[0]?.slots || {});
  
  // Active Slot Editor States
  const [editingSlotKey, setEditingSlotKey] = useState(null);
  const [slotUrlInput, setSlotUrlInput] = useState('');
  const [slotCaptionInput, setSlotCaptionInput] = useState('');

  // Video Form State
  const [editingVideoId, setEditingVideoId] = useState(null);
  const [vTitle, setVTitle] = useState('');
  const [vCategory, setVCategory] = useState('Fashion & Beauty');
  const [vUrl, setVUrl] = useState('');
  const [vDuration, setVDuration] = useState('08:30');
  const [vMatch, setVMatch] = useState('98');
  const [vIsTop10, setVIsTop10] = useState(false);
  const [vRank, setVRank] = useState('1');
  const [vColor, setVColor] = useState('#e50914');
  const [vThumbnail, setVThumbnail] = useState('');

  // Simulated transcoding state
  const [isTranscoding, setIsTranscoding] = useState(false);
  const [transcodeStep, setTranscodeStep] = useState(0);
  const [transcodeProgress, setTranscodeProgress] = useState(0);
  const [transcodeLog, setTranscodeLog] = useState([]);

  // Super Admin - Provisioning form
  const [provCoupleName, setProvCoupleName] = useState('');
  const [provSlug, setProvSlug] = useState('');
  const [provPin, setProvPin] = useState('');
  const [provVenue, setProvVenue] = useState('');
  const [provDate, setProvDate] = useState('');
  const [provExpiry, setProvExpiry] = useState('2026-12-31');
  const [provLimit, setProvLimit] = useState(200);
  const [provCover, setProvCover] = useState('');

  // Simulated Live Activity Log for Super Admin
  const [liveLogs, setLiveLogs] = useState([
    { id: 1, time: '12:44:10', message: 'Sharma Family Portal unlocked via Guest PIN.' },
    { id: 2, time: '12:44:32', message: 'Simulated viewer session started from New Delhi.' },
    { id: 3, time: '12:45:01', message: 'HLS stream player buffered successfully (1080p).' }
  ]);

  useEffect(() => {
    if (initialCollages && initialCollages.length > 0) {
      setCollageLayouts(initialCollages);
      const activeItem = initialCollages.find(c => c.id === selectedCollageId) || initialCollages[0];
      if (activeItem) {
        setSelectedCollageId(activeItem.id);
        setEditingCollageType(activeItem.type);
        setEditingSlots(activeItem.slots);
      }
    }
  }, [initialCollages, selectedCollageId]);

  // Sync inputs on active workspace change
  useEffect(() => {
    setCoupleName(eventSettings.coupleName || '');
    setWeddingDate(eventSettings.weddingDate || '');
    setWeddingVenue(eventSettings.weddingVenue || '');
    setCustomGreeting(eventSettings.customGreeting || '');
    setHeroVideoUrl(eventSettings.heroVideoUrl || '');
    setAccessPin(eventSettings.accessPin || '1111');
    setExpiryDate(eventSettings.expiryDate || '2026-12-31');
    setCoverImage(eventSettings.coverImage || '');
  }, [eventSettings, activeSlug]);

  // Live Activity Simulator interval for Super Admin
  useEffect(() => {
    if (role !== 'super_admin') return;
    const interval = setInterval(() => {
      const cities = ['Udaipur', 'Jodhpur', 'Mumbai', 'London', 'Dubai', 'Jaipur', 'Delhi', 'New York'];
      const actions = [
        "playing 'Pure Celebration' (Season 1, Ep 1)",
        "browsing the 'Wedding Gallery' mosaic collages",
        "watching 'Dance of Joy' in full screen",
        "viewing 'Pre-Wedding Film' showcase row",
        "added 'Sacred Vows' to their stream List"
      ];
      const randCity = cities[Math.floor(Math.random() * cities.length)];
      const randAction = actions[Math.floor(Math.random() * actions.length)];
      const clients = Object.values(tenants).map(t => t.eventSettings?.coupleName || 'Active Space');
      const randClient = clients[Math.floor(Math.random() * clients.length)];

      const date = new Date();
      const timeStr = `${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}:${date.getSeconds().toString().padStart(2,'0')}`;
      
      setLiveLogs(prev => [
        { id: Date.now(), time: timeStr, message: `Guest from ${randCity} on ${randClient} portal is ${randAction}.` },
        ...prev.slice(0, 15)
      ]);
    }, 4500);

    return () => clearInterval(interval);
  }, [role, tenants]);

  // Local active workspace analytics (simulated)
  const localStats = {
    viewsToday: Math.floor(Math.random() * 80) + 110,
    watchTimeHrs: (Math.random() * 40 + 60).toFixed(1),
    activeSessions: Math.floor(Math.random() * 5) + 2,
    avgCompletion: '84%'
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    onSaveSettings({ coupleName, weddingDate, weddingVenue, customGreeting, heroVideoUrl, accessPin, expiryDate, coverImage, status: eventSettings.status || 'ACTIVE', storageLimitGb: eventSettings.storageLimitGb || 200, storageUsedGb: eventSettings.storageUsedGb || 45.2 });
    alert('Wedding settings successfully saved to LocalStorage!');
  };

  const handleVideoSubmit = (e) => {
    e.preventDefault();
    if (!vTitle || !vUrl) {
      alert('Please fill out all fields.');
      return;
    }

    const payload = {
      title: vTitle,
      category: vCategory,
      url: vUrl,
      thumbnail: vThumbnail || 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
      duration: vDuration,
      match: parseInt(vMatch) || 98,
      isTop10: vIsTop10,
      rank: vIsTop10 ? parseInt(vRank) : undefined,
      color: vColor
    };

    // Trigger transcoding simulation
    setIsTranscoding(true);
    setTranscodeStep(1);
    setTranscodeProgress(5);
    setTranscodeLog(["[QUEUE] Received raw upload payload. Initiating pipeline..."]);

    const steps = [
      { progress: 20, log: "[STEP 1/5] Demuxing stream & validating aspect ratio (16:9 cinematic check)..." },
      { progress: 45, log: "[STEP 2/5] Splitting MP4 frames into segmented 10-second TS blocks..." },
      { progress: 70, log: "[STEP 3/5] Transcoding HLS stream profiles (1080p @ 4500kbps, 720p @ 2200kbps)..." },
      { progress: 90, log: "[STEP 4/5] Compiling m3u8 master playlist with absolute DRM encryption keys..." },
      { progress: 100, log: "[STEP 5/5] Deploying blocks to edge CDN clusters. Warm up successful!" }
    ];

    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < steps.length) {
        const step = steps[currentIdx];
        setTranscodeStep(currentIdx + 1);
        setTranscodeProgress(step.progress);
        setTranscodeLog(prev => [...prev, step.log]);
        currentIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsTranscoding(false);
          if (editingVideoId) {
            onEditVideo({ id: editingVideoId, ...payload });
            setEditingVideoId(null);
            alert('Wedding moment successfully updated!');
          } else {
            onAddVideo({ id: 'v_' + Date.now(), ...payload });
            alert('New wedding clip published successfully!');
          }

          // Reset Form
          setVTitle('');
          setVUrl('');
          setVThumbnail('');
          setVDuration('08:30');
          setVMatch('98');
          setVIsTop10(false);
          setVColor('#e50914');
        }, 800);
      }
    }, 900);
  };

  const handleStartEdit = (vid) => {
    setEditingVideoId(vid.id);
    setVTitle(vid.title);
    setVCategory(vid.category);
    setVUrl(vid.url);
    setVThumbnail(vid.thumbnail || '');
    setVDuration(vid.duration || '08:30');
    setVMatch(vid.match?.toString() || '98');
    setVIsTop10(!!vid.isTop10);
    setVRank(vid.rank?.toString() || '1');
    setVColor(vid.color || '#e50914');
    setActiveTab('add-video');
  };

  const handleProvisionWorkspace = (e) => {
    e.preventDefault();
    if (!provCoupleName || !provSlug || !provPin) {
      alert("Please fill in all required fields.");
      return;
    }

    if (tenants[provSlug]) {
      alert("A workspace with this URL slug already exists. Please choose a unique slug.");
      return;
    }

    const newTenant = {
      slug: provSlug,
      eventSettings: {
        coupleName: provCoupleName.toUpperCase(),
        weddingDate: provDate || 'Upcoming',
        weddingVenue: provVenue || 'To Be Announced',
        customGreeting: `Relive the magical moments, films, and ceremonies of ${provCoupleName}.`,
        heroVideoUrl: '/Video/video_1.mp4',
        accessPin: provPin,
        status: 'ACTIVE',
        expiryDate: provExpiry || '2026-12-31',
        storageLimitGb: Number(provLimit) || 200,
        storageUsedGb: 0,
        coverImage: provCover || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      },
      weddingVideos: [],
      collageLayouts: [
        {
          id: 'c1_' + Date.now(),
          name: 'Ceremony Mosaic Highlights',
          type: 'mosaic',
          slots: {
            slot1: { url: '', caption: '' },
            slot2: { url: '', caption: '' },
            slot3: { url: '', caption: '' }
          }
        }
      ],
      weddingSeries: {
        id: 'series_' + Date.now(),
        title: provCoupleName.toUpperCase(),
        subtitle: 'A Wedding Original',
        description: `Experience the full cinematic journey of ${provCoupleName}.`,
        starring: ['Bride', 'Groom', 'Family', 'Friends'],
        year: new Date().getFullYear().toString(),
        totalSeasons: 1,
        heroVideoUrl: '/Video/video_1.mp4',
        genres: ['Romance', 'Celebration'],
        seasons: [
          {
            id: 'season1_' + Date.now(),
            title: 'GRAND UNION',
            seasonNumber: 1,
            subtitle: 'The Celebration Begins',
            ageRating: 'U/A 16+',
            thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
            seasonLabel: 'Season 1',
            episodes: []
          }
        ]
      }
    };

    const updatedTenants = {
      ...tenants,
      [provSlug]: newTenant
    };

    onUpdateTenants(updatedTenants);
    alert(`Successfully provisioned the '${provCoupleName}' workspace.`);
    
    // Clear Form
    setProvCoupleName('');
    setProvSlug('');
    setProvPin('');
    setProvVenue('');
    setProvDate('');
    setProvLimit(200);
    setProvCover('');
    setActiveTab('super-directory');
  };

  const handleToggleTenantStatus = (slug) => {
    const tenant = tenants[slug];
    if (!tenant) return;
    
    const currentStatus = tenant.eventSettings.status || 'ACTIVE';
    const nextStatus = currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    
    const updated = {
      ...tenants,
      [slug]: {
        ...tenant,
        eventSettings: {
          ...tenant.eventSettings,
          status: nextStatus
        }
      }
    };
    onUpdateTenants(updated);
  };

  const handleQuotaBump = (slug) => {
    const tenant = tenants[slug];
    if (!tenant) return;
    
    const currentLimit = tenant.eventSettings.storageLimitGb || 200;
    const nextLimit = currentLimit + 50;
    
    const updated = {
      ...tenants,
      [slug]: {
        ...tenant,
        eventSettings: {
          ...tenant.eventSettings,
          storageLimitGb: nextLimit
        }
      }
    };
    onUpdateTenants(updated);
  };

  const handleDeleteTenant = (slug) => {
    if (slug === 'mrunal-anirudh') {
      alert("Cannot delete primary seeded workspace.");
      return;
    }
    if (window.confirm(`Are you absolutely sure you want to delete client workspace '${slug}'? All data will be lost permanently.`)) {
      const copy = { ...tenants };
      delete copy[slug];
      onUpdateTenants(copy);
      alert("Workspace deleted successfully.");
    }
  };

  const handleBypassLogin = (slug) => {
    onSwitchActiveSlug(slug);
  };

  // Super Admin Metrics calculations
  const totalPortals = Object.keys(tenants).length;
  const activePortals = Object.values(tenants).filter(t => t.eventSettings.status === 'ACTIVE').length;
  const suspendedPortals = totalPortals - activePortals;
  const totalAllocatedStorage = Object.values(tenants).reduce((sum, t) => sum + (t.eventSettings.storageLimitGb || 200), 0);
  const totalUsedStorage = Object.values(tenants).reduce((sum, t) => sum + (t.eventSettings.storageUsedGb || 0), 0).toFixed(1);

  return (
    <div className="admin-modal">
      <div className="admin-box" style={{ maxWidth: 1000 }}>
        {/* Header */}
        <div className="admin-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: '#e50914', display: 'inline-flex' }}>
              <AppIcon type={role === 'super_admin' ? 'shield' : 'camera'} size={28} />
            </span>
            <div>
              <h2 style={{ fontSize: 19, color: '#fff', fontWeight: 800, letterSpacing: '0.5px' }}>
                {role === 'super_admin' ? 'Wedflix Super Admin Command Panel' : 'Wedflix Photographer Console'}
              </h2>
              <p style={{ fontSize: 11, color: '#e50914', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: 2 }}>
                {role === 'super_admin' ? `MASTER OVERVIEW - ${totalPortals} PORTALS` : `PORTAL BUILDER FOR CLIENT: ${eventSettings.coupleName}`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.08)', borderRadius: '50%', width: 32, height: 32,
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18,
              transition: 'background 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#e50914'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
          >
            &times;
          </button>
        </div>

        {/* Outer Split screen */}
        <div className="admin-content" style={{ height: 600 }}>
          {/* Sidebar */}
          <div className="admin-sidebar" style={{ width: 260 }}>
            {role === 'super_admin' ? (
              <>
                <button className={`admin-menu-btn ${activeTab === 'super-analytics' ? 'active' : ''}`} onClick={() => setActiveTab('super-analytics')}>
                  <AppIcon type="chart" size={16} /> Global Analytics Desk
                </button>
                <button className={`admin-menu-btn ${activeTab === 'super-directory' ? 'active' : ''}`} onClick={() => setActiveTab('super-directory')}>
                  <AppIcon type="building" size={16} /> Client Portals Directory ({totalPortals})
                </button>
                <button className={`admin-menu-btn ${activeTab === 'super-provision' ? 'active' : ''}`} onClick={() => setActiveTab('super-provision')}>
                  <AppIcon type="plus" size={16} /> Provision New Space
                </button>
              </>
            ) : (
              <>
                <button className={`admin-menu-btn ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
                  <AppIcon type="settings" size={16} /> Workspace Setup Settings
                </button>
                <button className={`admin-menu-btn ${activeTab === 'manage' ? 'active' : ''}`} onClick={() => setActiveTab('manage')}>
                  <AppIcon type="folder" size={16} /> Manage Ceremony Clips ({videos.length})
                </button>
                <button className={`admin-menu-btn ${activeTab === 'add-video' ? 'active' : ''}`} onClick={() => { setEditingVideoId(null); setActiveTab('add-video'); }}>
                  <AppIcon type={editingVideoId ? 'edit' : 'video'} size={16} /> {editingVideoId ? 'Edit Selected Video' : 'Upload / Add Video'}
                </button>
                <button className={`admin-menu-btn ${activeTab === 'collage' ? 'active' : ''}`} onClick={() => setActiveTab('collage')}>
                  <AppIcon type="camera" size={16} /> Manage Photo Collage
                </button>
                <button className={`admin-menu-btn ${activeTab === 'local-analytics' ? 'active' : ''}`} onClick={() => setActiveTab('local-analytics')}>
                  <AppIcon type="chart" size={16} /> Local Analytics & Storage
                </button>
              </>
            )}

            <div style={{ marginTop: 'auto', padding: 14, background: 'rgba(255,255,255,0.02)', borderRadius: 6, border: '1px dashed rgba(255,255,255,0.1)', fontSize: 11, color: '#888', lineHeight: 1.5 }}>
              <span style={{ display: 'inline-flex', verticalAlign: 'middle', marginRight: 6 }}><AppIcon type="shield" size={14} /></span>
              {role === 'super_admin' ? 'Super Admin holds full override authority across all tenant domains.' : `You are building a customized Netflix experience for ${eventSettings.coupleName}.`}
            </div>
          </div>

          {/* Main Content Workspace */}
          <div className="admin-main">
            {/* SUPER ADMIN WORKSPACE */}
            {role === 'super_admin' && activeTab === 'super-analytics' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <h3 style={{ color: '#e50914', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 8 }}>Global Performance Analytics</h3>
                
                {/* Metric Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                  <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: 16 }}>
                    <span style={{ fontSize: 12, color: '#999', fontWeight: 600 }}>ACTIVE PORTALS</span>
                    <h4 style={{ fontSize: 28, color: '#27ae60', margin: '6px 0 0', fontWeight: 800 }}>{activePortals} <span style={{ fontSize: 13, color: '#666', fontWeight: 400 }}>/ {totalPortals}</span></h4>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: 16 }}>
                    <span style={{ fontSize: 12, color: '#999', fontWeight: 600 }}>GLOBAL STORAGE USED</span>
                    <h4 style={{ fontSize: 24, color: '#fff', margin: '6px 0 0', fontWeight: 800 }}>{totalUsedStorage} GB</h4>
                    <span style={{ fontSize: 11, color: '#555' }}>Limit: {totalAllocatedStorage} GB</span>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: 16 }}>
                    <span style={{ fontSize: 12, color: '#999', fontWeight: 600 }}>LIVE SIM VIEWER SESSIONS</span>
                    <h4 style={{ fontSize: 28, color: '#e50914', margin: '6px 0 0', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 8 }}>{localStats.activeSessions + 2} <span style={{ color: '#27ae60', display: 'inline-flex' }}><AppIcon type="status" size={13} /></span></h4>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: 16 }}>
                    <span style={{ fontSize: 12, color: '#999', fontWeight: 600 }}>EST. TRAFFIC RATE</span>
                    <h4 style={{ fontSize: 24, color: '#fff', margin: '6px 0 0', fontWeight: 800 }}>142.8 Mbps</h4>
                    <span style={{ fontSize: 11, color: '#27ae60' }}>CDN Edge CDN: 99.9%</span>
                  </div>
                </div>

                {/* Storage Quota utilization bar */}
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: 18, borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, color: '#ccc', marginBottom: 8 }}>
                    <span>Global Storage utilization gauge</span>
                    <span>{((Number(totalUsedStorage) / totalAllocatedStorage) * 100).toFixed(1)}% ({totalUsedStorage} GB of {totalAllocatedStorage} GB allocated)</span>
                  </div>
                  <div style={{ width: '100%', height: 10, background: 'rgba(255,255,255,0.1)', borderRadius: 5, overflow: 'hidden' }}>
                    <div style={{ width: `${(Number(totalUsedStorage) / totalAllocatedStorage) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #e50914, #d35400)', borderRadius: 5 }} />
                  </div>
                </div>

                {/* Visual Chart Mockups */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 16 }}>
                  {/* Left: Active sessions bar chart */}
                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, padding: 16 }}>
                    <h4 style={{ fontSize: 13, color: '#e50914', fontWeight: 800, marginBottom: 16, textTransform: 'uppercase' }}>Active Streams by Client Domain</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {Object.values(tenants).map((t, idx) => {
                        const colors = ['#e50914', '#2980b9', '#27ae60', '#f39c12'];
                        const sessions = idx === 0 ? 4 : idx === 1 ? 2 : 1;
                        return (
                          <div key={t.slug} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{ fontSize: 11, color: '#aaa', width: 110, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.eventSettings?.coupleName}</span>
                            <div style={{ flexGrow: 1, background: 'rgba(255,255,255,0.05)', height: 12, borderRadius: 6, overflow: 'hidden' }}>
                              <div style={{ width: `${sessions * 20}%`, height: '100%', background: colors[idx % colors.length] }} />
                            </div>
                            <span style={{ fontSize: 11, fontWeight: 'bold', width: 20 }}>{sessions}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right: Live stream hit simulator log */}
                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, padding: 16, display: 'flex', flexDirection: 'column' }}>
                    <h4 style={{ fontSize: 13, color: '#e50914', fontWeight: 800, marginBottom: 12, textTransform: 'uppercase' }}>Real-time simulated viewer stream events</h4>
                    <div style={{ flexGrow: 1, maxHeight: 180, overflowY: 'auto', background: '#0e0e0e', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 6, padding: 8, fontFamily: 'monospace', fontSize: 11, color: '#27ae60', lineHeight: 1.4 }}>
                      {liveLogs.map(log => (
                        <div key={log.id} style={{ marginBottom: 4 }}>
                          <span style={{ color: '#888' }}>[{log.time}]</span> {log.message}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {role === 'super_admin' && activeTab === 'super-directory' && (
              <div>
                <h3 style={{ color: '#e50914', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 8, marginBottom: 16 }}>Client Workspace Directory</h3>
                <div style={{ maxHeight: 460, overflowY: 'auto' }}>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Couple Name & Slug</th>
                        <th>Status</th>
                        <th>Access PIN</th>
                        <th>Storage Utilized</th>
                        <th>Actions Override</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.values(tenants).map((t) => {
                        const isSuspended = t.eventSettings.status === 'SUSPENDED';
                        const isExpired = t.eventSettings.expiryDate && new Date() > new Date(t.eventSettings.expiryDate);
                        
                        return (
                          <tr key={t.slug} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <td>
                              <div style={{ fontWeight: 700, fontSize: 14 }}>{t.eventSettings.coupleName}</div>
                              <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>Slug: <span style={{ color: '#aaa' }}>{t.slug}</span></div>
                            </td>
                            <td>
                              {isSuspended ? (
                                <span style={{ background: 'rgba(229,9,20,0.15)', color: '#e50914', fontSize: 10, padding: '2px 8px', borderRadius: 4, fontWeight: 800, textTransform: 'uppercase' }}>Suspended</span>
                              ) : isExpired ? (
                                <span style={{ background: 'rgba(211,84,0,0.15)', color: '#d35400', fontSize: 10, padding: '2px 8px', borderRadius: 4, fontWeight: 800, textTransform: 'uppercase' }}>Expired</span>
                              ) : (
                                <span style={{ background: 'rgba(39,174,96,0.15)', color: '#27ae60', fontSize: 10, padding: '2px 8px', borderRadius: 4, fontWeight: 800, textTransform: 'uppercase' }}>Active</span>
                              )}
                            </td>
                            <td>
                              <span style={{ fontFamily: 'monospace', fontWeight: 'bold', fontSize: 13, background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: 4 }}>{t.eventSettings.accessPin}</span>
                            </td>
                            <td>
                              <div style={{ fontSize: 12, fontWeight: 600 }}>{(t.eventSettings.storageUsedGb || 0).toFixed(1)} GB <span style={{ color: '#555' }}>/ {t.eventSettings.storageLimitGb || 200} GB</span></div>
                              <div style={{ width: 80, height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, marginTop: 4, overflow: 'hidden' }}>
                                <div style={{ width: `${((t.eventSettings.storageUsedGb || 0) / (t.eventSettings.storageLimitGb || 200)) * 80}px`, height: '100%', background: '#e50914' }} />
                              </div>
                            </td>
                            <td>
                              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                <button
                                  onClick={() => handleToggleTenantStatus(t.slug)}
                                  style={{ background: isSuspended ? '#27ae60' : '#d35400', color: '#fff', fontSize: 11, padding: '4px 8px', borderRadius: 4, fontWeight: 'bold' }}
                                >
                                  {isSuspended ? 'Unsuspend' : 'Suspend'}
                                </button>
                                <button
                                  onClick={() => handleBypassLogin(t.slug)}
                                  style={{ background: '#2980b9', color: '#fff', fontSize: 11, padding: '4px 8px', borderRadius: 4, fontWeight: 'bold' }}
                                >
                                  Bypass Login
                                </button>
                                <button
                                  onClick={() => handleQuotaBump(t.slug)}
                                  style={{ background: '#8e44ad', color: '#fff', fontSize: 11, padding: '4px 8px', borderRadius: 4, fontWeight: 'bold' }}
                                >
                                  Quota +50G
                                </button>
                                <button
                                  onClick={() => handleDeleteTenant(t.slug)}
                                  style={{ background: '#c0392b', color: '#fff', fontSize: 11, padding: '4px 8px', borderRadius: 4, fontWeight: 'bold' }}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {role === 'super_admin' && activeTab === 'super-provision' && (
              <form onSubmit={handleProvisionWorkspace}>
                <h3 style={{ color: '#e50914', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 8, marginBottom: 16 }}>Provision New Wedding Workspace</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div className="admin-form-group">
                    <label className="admin-label">Workspace Title (e.g. Akash & Sneha)</label>
                    <input type="text" value={provCoupleName} onChange={e => {
                      setProvCoupleName(e.target.value);
                      // Auto slug generation
                      setProvSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-'));
                    }} className="admin-input" placeholder="Enter Couple / Event Title" required />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Workspace URL Slug (Unique deep link key)</label>
                    <input type="text" value={provSlug} onChange={e => setProvSlug(e.target.value.toLowerCase())} className="admin-input" placeholder="e.g. akash-sneha" required />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                  <div className="admin-form-group">
                    <label className="admin-label">Secure 4-Digit Access PIN</label>
                    <input type="text" maxLength={4} value={provPin} onChange={e => setProvPin(e.target.value.replace(/[^0-9]/g, ''))} className="admin-input" placeholder="e.g. 5555" required />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Wedding Date Label</label>
                    <input type="text" value={provDate} onChange={e => setProvDate(e.target.value)} className="admin-input" placeholder="e.g. 24th January 2027" />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Initial Storage Quota limit (GB)</label>
                    <input type="number" min={50} max={1000} value={provLimit} onChange={e => setProvLimit(e.target.value)} className="admin-input" required />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Celebration Venue Location</label>
                  <input type="text" value={provVenue} onChange={e => setProvVenue(e.target.value)} className="admin-input" placeholder="e.g. Rambagh Palace, Jaipur" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 16 }}>
                  <div className="admin-form-group">
                    <label className="admin-label">Portal Expiration Date (YYYY-MM-DD)</label>
                    <input type="date" value={provExpiry} onChange={e => setProvExpiry(e.target.value)} className="admin-input" required />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Custom Cover Image URL (Optional banner poster)</label>
                    <input type="text" value={provCover} onChange={e => setProvCover(e.target.value)} className="admin-input" placeholder="e.g. https://images.unsplash.com/photo-..." />
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    background: '#e50914', color: '#fff', padding: '12px 28px', borderRadius: 4,
                    fontWeight: 800, fontSize: 14, marginTop: 12, boxShadow: '0 4px 15px rgba(229,9,20,0.3)'
                  }}
                >
                  🚀 Provision Workspace Domain
                </button>
              </form>
            )}

            {/* PHOTOGRAPHER CONSOLE WORKSPACE */}
            {role === 'photographer' && activeTab === 'settings' && (
              <form onSubmit={handleSaveSettings}>
                <h3 style={{ color: '#e50914', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 8, marginBottom: 16 }}>Wedding Ceremony Meta Details</h3>
                
                <div className="admin-form-group">
                  <label className="admin-label">Couple Names (e.g. MRUNAL & ANIRUDH)</label>
                  <input type="text" value={coupleName} onChange={e => setCoupleName(e.target.value)} className="admin-input" required />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div className="admin-form-group">
                    <label className="admin-label">Wedding Celebration Date</label>
                    <input type="text" value={weddingDate} onChange={e => setWeddingDate(e.target.value)} className="admin-input" required />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Ceremony Venue Location</label>
                    <input type="text" value={weddingVenue} onChange={e => setWeddingVenue(e.target.value)} className="admin-input" required />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Dashboard Welcome Script Greeting</label>
                  <textarea rows={2} value={customGreeting} onChange={e => setCustomGreeting(e.target.value)} className="admin-input" style={{ resize: 'none', fontFamily: 'inherit' }} />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Featured Hero Wedding Film URL (YouTube/Vimeo/Direct MP4)</label>
                  <input type="text" value={heroVideoUrl} onChange={e => setHeroVideoUrl(e.target.value)} className="admin-input" required />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                  <div className="admin-form-group">
                    <label className="admin-label">Viewer Access PIN</label>
                    <input type="text" maxLength={4} value={accessPin} onChange={e => setAccessPin(e.target.value)} className="admin-input" required />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Workspace Expiry Date</label>
                    <input type="date" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} className="admin-input" required />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Workspace Cover Poster URL</label>
                    <input type="text" value={coverImage} onChange={e => setCoverImage(e.target.value)} className="admin-input" />
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    background: '#e50914', color: '#fff', padding: '12px 24px', borderRadius: 4,
                    fontWeight: 700, fontSize: 14, marginTop: 10, boxShadow: '0 4px 15px rgba(229,9,20,0.3)'
                  }}
                >
                  Save Workspace Invitation Settings
                </button>
              </form>
            )}

            {role === 'photographer' && activeTab === 'manage' && (
              <div>
                <h3 style={{ color: '#e50914', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 8, marginBottom: 16 }}>Currently Published Videos</h3>
                <div style={{ maxHeight: 460, overflowY: 'auto' }}>
                  {videos.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 0', color: '#666' }}>
                      <span style={{ color: '#e50914', display: 'inline-flex', marginBottom: 12 }}><AppIcon type="video" size={32} /></span>
                      <p style={{ fontSize: 13, color: '#888' }}>No ceremony clips published in this workspace yet.</p>
                    </div>
                  ) : (
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Video Title</th>
                          <th>Category</th>
                          <th>Duration</th>
                          <th>Rank status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {videos.map(v => (
                          <tr key={v.id}>
                            <td style={{ fontWeight: 600 }}>{v.title}</td>
                            <td>
                              <span style={{ background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: 4, fontSize: 11 }}>{v.category}</span>
                            </td>
                            <td>{v.duration}</td>
                            <td>{v.isTop10 ? `Top ${v.rank}` : '-'}</td>
                            <td>
                              <div style={{ display: 'flex', gap: 8 }}>
                                <button
                                  onClick={() => handleStartEdit(v)}
                                  style={{ background: '#27ae60', color: '#fff', fontSize: 12, padding: '4px 10px', borderRadius: 4 }}
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => { if (window.confirm('Delete this wedding video?')) onDeleteVideo(v.id); }}
                                  style={{ background: '#c0392b', color: '#fff', fontSize: 12, padding: '4px 10px', borderRadius: 4 }}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}

            {role === 'photographer' && activeTab === 'add-video' && (
              <div>
                {isTranscoding ? (
                  <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    minHeight: 400, background: '#0e0e0e', border: '1.5px solid rgba(229,9,20,0.3)',
                    borderRadius: 8, padding: 24, textAlign: 'center'
                  }}>
                    {/* Cinematic Spinner */}
                    <div className="transcode-spinner" style={{
                      width: 60, height: 60, border: '4px solid rgba(255,255,255,0.05)',
                      borderTop: '4px solid #e50914', borderRadius: '50%',
                      animation: 'spin 1s linear infinite', marginBottom: 24
                    }} />
                    
                    <style>{`
                      @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                      }
                    `}</style>

                    <h4 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 4 }}>Simulating Cloud HLS Video Transcoding</h4>
                    <p style={{ fontSize: 12, color: '#e50914', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Pipeline Step {transcodeStep} / 5 ({transcodeProgress}%)
                    </p>

                    {/* Progress Bar */}
                    <div style={{ width: '100%', maxWidth: 400, height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3, margin: '16px 0', overflow: 'hidden' }}>
                      <div style={{ width: `${transcodeProgress}%`, height: '100%', background: '#e50914', transition: 'width 0.3s ease' }} />
                    </div>

                    {/* Sim logs */}
                    <div style={{
                      width: '100%', maxWidth: 500, height: 160, background: '#070707',
                      border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, padding: 12,
                      fontFamily: 'monospace', fontSize: 10, color: '#27ae60', textAlign: 'left',
                      overflowY: 'auto', lineHeight: 1.5
                    }}>
                      {transcodeLog.map((log, i) => (
                        <div key={i}>{log}</div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleVideoSubmit}>
                    <h3 style={{ color: '#e50914', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 8, marginBottom: 16 }}>
                      {editingVideoId ? `Edit Video: ${vTitle}` : 'Create & Publish New Ceremony Video'}
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
                      <div className="admin-form-group">
                        <label className="admin-label">Ceremony Moment Title</label>
                        <input type="text" value={vTitle} onChange={e => setVTitle(e.target.value)} className="admin-input" placeholder="e.g. Aarav & Sona Varmala Exchange" required />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">Aesthetic Color Banner Accent</label>
                        <select value={vColor} onChange={e => setVColor(e.target.value)} className="admin-select">
                          <option value="#e50914">Signature Netflix Red</option>
                          <option value="#2980b9">Royal Udaipur Blue</option>
                          <option value="#27ae60">Sangeet Garden Green</option>
                          <option value="#8e44ad">Midnight Purple</option>
                          <option value="#f39c12">Haldi Yellow-Gold</option>
                          <option value="#d35400">Mehndi Orange</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div className="admin-form-group">
                        <label className="admin-label">Category Row Section</label>
                        <select value={vCategory} onChange={e => setVCategory(e.target.value)} className="admin-select">
                          <option value="Fashion & Beauty">Fashion & Beauty</option>
                          <option value="Food & Drinks">Food & Drinks</option>
                          <option value="Lifestyle & Wellness">Lifestyle & Wellness</option>
                        </select>
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">Video Clip Link (YouTube/MP4 Video Source)</label>
                        <input type="text" value={vUrl} onChange={e => setVUrl(e.target.value)} className="admin-input" placeholder="e.g. https://www.youtube.com/watch?v=..." required />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div className="admin-form-group">
                        <label className="admin-label">Clip Playtime Duration (e.g. 15:40)</label>
                        <input type="text" value={vDuration} onChange={e => setVDuration(e.target.value)} className="admin-input" required />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">Client Match Score percentage (Love Match %)</label>
                        <input type="number" min="50" max="100" value={vMatch} onChange={e => setVMatch(e.target.value)} className="admin-input" required />
                      </div>
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-label">Thumbnail Image URL (Optional)</label>
                      <input
                        type="text"
                        value={vThumbnail}
                        onChange={e => setVThumbnail(e.target.value)}
                        className="admin-input"
                        placeholder="e.g. https://images.unsplash.com/photo-... or local path"
                      />
                      <span style={{ fontSize: 11, color: '#888' }}>Providing an image link turns the card into a gorgeous visual poster like the real Netflix!</span>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '12px 16px', borderRadius: 4, marginTop: 8, marginBottom: 16 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <input type="checkbox" id="istop10" checked={vIsTop10} onChange={e => setVIsTop10(e.target.checked)} style={{ width: 18, height: 18, accentColor: '#e50914', cursor: 'pointer' }} />
                        <label htmlFor="istop10" style={{ fontSize: 14, fontWeight: 700, cursor: 'pointer', color: '#e50914' }}>
                          Feature in Top 10 Ceremonies Grid
                        </label>
                      </div>
                      {vIsTop10 && (
                        <div className="admin-form-group" style={{ marginTop: 12 }}>
                          <label className="admin-label">Select Top Rank Slot (1 - 10)</label>
                          <select value={vRank} onChange={e => setVRank(e.target.value)} className="admin-select" style={{ maxWidth: 120 }}>
                            {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>Slot Rank {n}</option>)}
                          </select>
                        </div>
                      )}
                    </div>
                    <button
                      type="submit"
                      style={{
                        background: '#e50914', color: '#fff', padding: '12px 30px', borderRadius: 4,
                        fontWeight: 700, fontSize: 14, boxShadow: '0 4px 15px rgba(229,9,20,0.3)'
                      }}
                    >
                      {editingVideoId ? 'Save Video Amendments' : 'Publish Ceremony Moment'}
                    </button>
                  </form>
                )}
              </div>
            )}

            {role === 'photographer' && activeTab === 'collage' && (
              <div style={{ display: 'flex', flexType: 'column', flexDirection: 'column', gap: 20 }}>
                <div>
                  <h3 style={{ color: '#e50914', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 8, marginBottom: 12 }}>
                    <span style={{ display: 'inline-flex', verticalAlign: 'middle', marginRight: 8 }}><AppIcon type="camera" size={18} /></span>
                    Interactive Collage & Photo Manager
                  </h3>
                  <p style={{ fontSize: 13, color: '#aaa' }}>
                    Select a layout template below, then click any grid box to insert/edit a photo in that spot.
                  </p>
                </div>

                {/* Collage templates list */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
                  <span style={{ fontSize: 13, color: '#ccc', fontWeight: 600 }}>Collage Album:</span>
                  <select
                    value={selectedCollageId}
                    onChange={(e) => {
                      const cid = e.target.value;
                      setSelectedCollageId(cid);
                      const col = collageLayouts.find(c => c.id === cid);
                      if (col) {
                        setEditingCollageType(col.type);
                        setEditingSlots(col.slots);
                        setEditingSlotKey(null);
                        setSlotUrlInput('');
                        setSlotCaptionInput('');
                      }
                    }}
                    style={{
                      background: '#1f1f1f',
                      color: '#fff',
                      border: '1px solid #333',
                      padding: '8px 12px',
                      borderRadius: 4,
                    }}
                  >
                    {collageLayouts.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>

                  <button
                    onClick={() => {
                      const newId = 'c_' + Date.now();
                      const newCollage = {
                        id: newId,
                        name: `Layout Album ${collageLayouts.length + 1}`,
                        type: 'mosaic',
                        slots: {
                          slot1: { url: '', caption: '' },
                          slot2: { url: '', caption: '' },
                          slot3: { url: '', caption: '' },
                        }
                      };
                      setCollageLayouts(prev => [...prev, newCollage]);
                      setSelectedCollageId(newId);
                      setEditingCollageType('mosaic');
                      setEditingSlots(newCollage.slots);
                      setEditingSlotKey(null);
                      setSlotUrlInput('');
                      setSlotCaptionInput('');
                    }}
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      color: '#fff',
                      padding: '8px 14px',
                      borderRadius: 4,
                      fontSize: 12,
                      fontWeight: 600,
                      border: '1px solid rgba(255,255,255,0.15)',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                  >
                    <span style={{ display: 'inline-flex', verticalAlign: 'middle', marginRight: 6 }}><AppIcon type="plus" size={13} /></span>
                    Add New Album
                  </button>

                  <button
                    onClick={() => {
                      if (collageLayouts.length <= 1) {
                        alert("You must keep at least one album.");
                        return;
                      }
                      const filtered = collageLayouts.filter(c => c.id !== selectedCollageId);
                      setCollageLayouts(filtered);
                      const first = filtered[0];
                      setSelectedCollageId(first.id);
                      setEditingCollageType(first.type);
                      setEditingSlots(first.slots);
                      setEditingSlotKey(null);
                      setSlotUrlInput('');
                      setSlotCaptionInput('');
                      alert("Album deleted.");
                    }}
                    style={{
                      background: 'rgba(229,9,20,0.15)',
                      color: '#e50914',
                      padding: '8px 14px',
                      borderRadius: 4,
                      fontSize: 12,
                      fontWeight: 600,
                      border: '1px solid rgba(229,9,20,0.25)',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(229,9,20,0.25)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(229,9,20,0.15)'}
                  >
                    <span style={{ display: 'inline-flex', verticalAlign: 'middle', marginRight: 6 }}><AppIcon type="trash" size={13} /></span>
                    Delete Album
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div className="admin-form-group">
                    <label className="admin-label">Album Name</label>
                    <input
                      type="text"
                      value={collageLayouts.find(c => c.id === selectedCollageId)?.name || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCollageLayouts(prev => prev.map(c => c.id === selectedCollageId ? { ...c, name: val } : c));
                      }}
                      className="admin-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-label">Grid Layout Style</label>
                    <select
                      value={editingCollageType}
                      onChange={(e) => {
                        const newType = e.target.value;
                        setEditingCollageType(newType);
                        let newSlots = {};
                        if (newType === 'mosaic') {
                          newSlots = {
                            slot1: editingSlots.slot1 || { url: '', caption: '' },
                            slot2: editingSlots.slot2 || { url: '', caption: '' },
                            slot3: editingSlots.slot3 || { url: '', caption: '' }
                          };
                        } else if (newType === 'portrait-row') {
                          newSlots = {
                            slot1: editingSlots.slot1 || { url: '', caption: '' },
                            slot2: editingSlots.slot2 || { url: '', caption: '' },
                            slot3: editingSlots.slot3 || { url: '', caption: '' }
                          };
                        } else if (newType === 'quad') {
                          newSlots = {
                            slot1: editingSlots.slot1 || { url: '', caption: '' },
                            slot2: editingSlots.slot2 || { url: '', caption: '' },
                            slot3: editingSlots.slot3 || { url: '', caption: '' },
                            slot4: editingSlots.slot4 || { url: '', caption: '' }
                          };
                        } else if (newType === 'spotlight') {
                          newSlots = {
                            slot1: editingSlots.slot1 || { url: '', caption: '' },
                            slot2: editingSlots.slot2 || { url: '', caption: '' },
                            slot3: editingSlots.slot3 || { url: '', caption: '' },
                            slot4: editingSlots.slot4 || { url: '', caption: '' }
                          };
                        }
                        setEditingSlots(newSlots);
                        setCollageLayouts(prev => prev.map(c => c.id === selectedCollageId ? { ...c, slots: newSlots, type: newType } : c));
                        setEditingSlotKey(null);
                        setSlotUrlInput('');
                        setSlotCaptionInput('');
                      }}
                      style={{
                        background: '#1f1f1f',
                        color: '#fff',
                        border: '1px solid #333',
                        padding: '10px',
                        width: '100%',
                        borderRadius: 4,
                      }}
                    >
                      <option value="mosaic">Layout A: Mosaic Grid (3 Photos)</option>
                      <option value="portrait-row">Layout B: Split Portrait Columns (3 Photos)</option>
                      <option value="quad">Layout C: Symmetrical Quad (4 Photos)</option>
                      <option value="spotlight">Layout D: Hero Spotlight Grid (4 Photos)</option>
                    </select>
                  </div>
                </div>

                {/* Main Interactive Editor Workspace */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 20, minHeight: 300 }}>
                  
                  {/* Left: Dummy Layout Visualization */}
                  <div style={{ background: '#1c1c1c', padding: 16, borderRadius: 8, border: '1px solid #2e2e2e' }}>
                    <div style={{ fontSize: 12, color: '#888', marginBottom: 12, display: 'flex', justifyContent: 'space-between' }}>
                      <span>Interactive Grid Preview</span>
                      <span style={{ color: '#e50914', fontWeight: 'bold' }}>Click any box to edit</span>
                    </div>

                    <div className={`${editingCollageType}-layout`} style={{ gap: 8, height: 260 }}>
                      {Object.keys(editingSlots).map((slotKey) => {
                        const slot = editingSlots[slotKey];
                        const isSelected = editingSlotKey === slotKey;
                        const isFilled = !!slot?.url;
                        const slotNum = slotKey.replace('slot', '');

                        return (
                          <div
                            key={slotKey}
                            onClick={() => {
                              setEditingSlotKey(slotKey);
                              setSlotUrlInput(slot?.url || '');
                              setSlotCaptionInput(slot?.caption || '');
                            }}
                            className={`collage-slot ${editingCollageType}-slot-${slotNum} ${isSelected ? 'active-edit' : ''} ${isFilled ? 'filled' : ''}`}
                            style={{
                              backgroundImage: isFilled ? `url(${slot.url})` : 'none',
                              cursor: 'pointer',
                              height: '100%',
                            }}
                          >
                            {!isFilled && (
                              <div style={{ textAlign: 'center', padding: 8 }}>
                                <div style={{ color: '#777', display: 'inline-flex', marginBottom: 4 }}><AppIcon type="plus" size={20} /></div>
                                <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: '#888' }}>Slot {slotNum}</div>
                                <div style={{ fontSize: 9, color: '#666', marginTop: 2 }}>Empty Box</div>
                              </div>
                            )}
                            {isFilled && (
                              <div className="collage-slot-overlay">
                                <div style={{ fontSize: 11, fontWeight: 700, color: '#e50914', textTransform: 'uppercase' }}>Slot {slotNum}</div>
                                <div style={{ fontSize: 10, color: '#fff', margin: '4px 0', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: '90%' }}>{slot.caption || 'No Caption'}</div>
                                <div style={{ fontSize: 9, background: 'rgba(0,0,0,0.5)', padding: '2px 6px', borderRadius: 4 }}>Edit Box</div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right: Slot Upload / Edit Form */}
                  <div style={{ background: '#1c1c1c', padding: 16, borderRadius: 8, border: '1px solid #2e2e2e', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    {editingSlotKey ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div style={{ borderBottom: '1px solid #333', paddingBottom: 8, marginBottom: 4 }}>
                          <span style={{ fontSize: 11, background: '#e50914', color: '#fff', padding: '2px 8px', borderRadius: 3, fontWeight: 700, textTransform: 'uppercase' }}>
                            Editing Slot {editingSlotKey.replace('slot', '')}
                          </span>
                          <h4 style={{ fontSize: 14, color: '#fff', marginTop: 8 }}>Configure Slot Media</h4>
                        </div>

                        <div className="admin-form-group">
                          <label className="admin-label">Photo Image URL</label>
                          <input
                            type="text"
                            value={slotUrlInput}
                            onChange={(e) => setSlotUrlInput(e.target.value)}
                            className="admin-input"
                            placeholder="https://images.unsplash.com/... or /Video/pic.jpg"
                          />
                        </div>

                        <div className="admin-form-group">
                          <label className="admin-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Quick Dummy Sample</span>
                            <span style={{ color: '#e50914', cursor: 'pointer' }} onClick={() => {
                              const dummyImages = [
                                'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
                                'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
                                'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
                                'https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&w=800&q=80',
                                'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
                                'https://images.unsplash.com/photo-1507504038482-7621006b3ee5?auto=format&fit=crop&w=800&q=80'
                              ];
                              const rand = dummyImages[Math.floor(Math.random() * dummyImages.length)];
                              setSlotUrlInput(rand);
                            }}>
                              <span style={{ display: 'inline-flex', verticalAlign: 'middle', marginRight: 4 }}><AppIcon type="bolt" size={12} /></span>
                              Generate Sample Url
                            </span>
                          </label>
                        </div>

                        <div className="admin-form-group">
                          <label className="admin-label">Photo Caption</label>
                          <input
                            type="text"
                            value={slotCaptionInput}
                            onChange={(e) => setSlotCaptionInput(e.target.value)}
                            className="admin-input"
                            placeholder="e.g. Ring exchange ceremony..."
                          />
                        </div>

                        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                          <button
                            onClick={() => {
                              const updatedSlots = {
                                ...editingSlots,
                                [editingSlotKey]: { url: slotUrlInput, caption: slotCaptionInput }
                              };
                              setEditingSlots(updatedSlots);
                              setCollageLayouts(prev => prev.map(c => c.id === selectedCollageId ? { ...c, slots: updatedSlots, type: editingCollageType } : c));
                              setEditingSlotKey(null);
                              setSlotUrlInput('');
                              setSlotCaptionInput('');
                            }}
                            style={{
                              flex: 1,
                              background: '#e50914',
                              color: '#fff',
                              padding: '10px 14px',
                              borderRadius: 4,
                              fontWeight: 700,
                              fontSize: 12,
                              textAlign: 'center',
                            }}
                          >
                            Save Photo to Box
                          </button>
                          <button
                            onClick={() => {
                              const updatedSlots = {
                                ...editingSlots,
                                [editingSlotKey]: { url: '', caption: '' }
                              };
                              setEditingSlots(updatedSlots);
                              setCollageLayouts(prev => prev.map(c => c.id === selectedCollageId ? { ...c, slots: updatedSlots, type: editingCollageType } : c));
                              setEditingSlotKey(null);
                              setSlotUrlInput('');
                              setSlotCaptionInput('');
                            }}
                            style={{
                              background: 'rgba(255,255,255,0.08)',
                              color: '#fff',
                              padding: '10px 14px',
                              borderRadius: 4,
                              fontWeight: 600,
                              fontSize: 12,
                            }}
                          >
                            Clear Slot
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div style={{ textAlign: 'center', color: '#666', padding: 20 }}>
                        <span style={{ color: '#777', display: 'inline-flex', marginBottom: 8 }}><AppIcon type="camera" size={32} /></span>
                        <p style={{ fontSize: 13, color: '#aaa', fontWeight: 500 }}>No Slot Selected</p>
                        <p style={{ fontSize: 11, color: '#888', marginTop: 4 }}>Click any grid slot on the left to set or edit its photo details.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => {
                      onSaveCollages(collageLayouts);
                      alert('Collage album layout published successfully to the Wedding Gallery!');
                    }}
                    style={{
                      background: '#e50914',
                      color: '#fff',
                      padding: '12px 28px',
                      borderRadius: 4,
                      fontWeight: 800,
                      fontSize: 14,
                      boxShadow: '0 4px 15px rgba(229,9,20,0.3)',
                    }}
                  >
                    Save & Publish Collage Gallery
                  </button>
                </div>
              </div>
            )}

            {role === 'photographer' && activeTab === 'local-analytics' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <h3 style={{ color: '#e50914', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 8 }}>Local Workspace Performance Statistics</h3>
                
                {/* Local cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                  <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: 16 }}>
                    <span style={{ fontSize: 11, color: '#999', fontWeight: 600 }}>TODAY'S PORTAL VIEWS</span>
                    <h4 style={{ fontSize: 26, color: '#fff', margin: '4px 0 0', fontWeight: 800 }}>{localStats.viewsToday}</h4>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: 16 }}>
                    <span style={{ fontSize: 11, color: '#999', fontWeight: 600 }}>WATCH TIME TOTAL</span>
                    <h4 style={{ fontSize: 26, color: '#fff', margin: '4px 0 0', fontWeight: 800 }}>{localStats.watchTimeHrs} hrs</h4>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: 16 }}>
                    <span style={{ fontSize: 11, color: '#999', fontWeight: 600 }}>ACTIVE NOW</span>
                    <h4 style={{ fontSize: 26, color: '#27ae60', margin: '4px 0 0', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 8 }}>{localStats.activeSessions} <span style={{ color: '#27ae60', display: 'inline-flex' }}><AppIcon type="status" size={12} /></span></h4>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: 16 }}>
                    <span style={{ fontSize: 11, color: '#999', fontWeight: 600 }}>AVG COMPLETION RATE</span>
                    <h4 style={{ fontSize: 26, color: '#fff', margin: '4px 0 0', fontWeight: 800 }}>{localStats.avgCompletion}</h4>
                  </div>
                </div>

                {/* Storage gauge */}
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: 20, borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700, color: '#ccc', marginBottom: 10 }}>
                    <span>Active Workspace Storage Usage</span>
                    <span>{((eventSettings.storageUsedGb || 45.2) / (eventSettings.storageLimitGb || 200) * 100).toFixed(1)}% ({(eventSettings.storageUsedGb || 45.2).toFixed(1)} GB used of {eventSettings.storageLimitGb || 200} GB limit)</span>
                  </div>
                  <div style={{ width: '100%', height: 10, background: 'rgba(255,255,255,0.1)', borderRadius: 5, overflow: 'hidden' }}>
                    <div style={{ width: `${((eventSettings.storageUsedGb || 45.2) / (eventSettings.storageLimitGb || 200)) * 100}%`, height: '100%', background: '#e50914', borderRadius: 5 }} />
                  </div>
                </div>

                {/* Simulated Viewer list */}
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, padding: 18 }}>
                  <h4 style={{ fontSize: 13, color: '#e50914', fontWeight: 800, marginBottom: 12, textTransform: 'uppercase' }}>Simulated Stream Sessions Live Feed</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: 6, fontSize: 12 }}>
                      <span style={{ color: '#aaa', fontWeight: 600 }}>Viewer Location</span>
                      <span style={{ color: '#aaa', fontWeight: 600 }}>Active Media Segment</span>
                      <span style={{ color: '#aaa', fontWeight: 600 }}>Quality Bitrate</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                      <span style={{ color: '#fff' }}>Guest (Mumbai, IN)</span>
                      <span style={{ color: '#27ae60' }}>Watching 'Pure Celebration' (Season 1, Ep 1)</span>
                      <span style={{ color: '#999' }}>1080p HLS (4.2 Mbps)</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                      <span style={{ color: '#fff' }}>Guest (Udaipur, IN)</span>
                      <span style={{ color: '#27ae60' }}>Watching 'Dance of Joy' (Season 2, Ep 1)</span>
                      <span style={{ color: '#999' }}>720p HLS (2.5 Mbps)</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                      <span style={{ color: '#fff' }}>Photographer Console</span>
                      <span style={{ color: '#e50914' }}>Active Configuration in Workspace</span>
                      <span style={{ color: '#999' }}>Admin (Session Authorized)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   SMART MEDIA PLAYER (FULL-SCREEN THEATER BOX)
   ============================================================ */
const PlayerScreen = ({ activeVideo, onBack }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);
  const [showSpeedDropdown, setShowSpeedDropdown] = useState(false);

  const hideTimer = useRef(null);

  const resetHideTimer = useCallback(() => {
    setShowControls(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
        setShowSpeedDropdown(false);
      }
    }, 3000);
  }, [isPlaying]);

  useEffect(() => {
    resetHideTimer();
    return () => clearTimeout(hideTimer.current);
  }, [resetHideTimer]);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  const handlePlayPause = (e) => {
    if (e) e.stopPropagation();
    setIsPlaying(prev => !prev);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsBuffering(false);
    }
  };

  const handleSeek = (e) => {
    const val = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = val;
      setCurrentTime(val);
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const newMute = !isMuted;
    setIsMuted(newMute);
    if (videoRef.current) {
      videoRef.current.muted = newMute;
      videoRef.current.volume = newMute ? 0 : volume;
    }
  };

  const skipTime = (amount, e) => {
    e.stopPropagation();
    if (videoRef.current) {
      let nextTime = videoRef.current.currentTime + amount;
      if (nextTime < 0) nextTime = 0;
      if (nextTime > duration) nextTime = duration;
      videoRef.current.currentTime = nextTime;
      setCurrentTime(nextTime);
    }
  };

  const handleSpeedChange = (rate, e) => {
    e.stopPropagation();
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
    setShowSpeedDropdown(false);
  };

  const toggleFullscreen = (e) => {
    if (e) e.stopPropagation();
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(err => console.log(err));
    } else {
      document.exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(err => console.log(err));
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const formatTime = (secs) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <motion.div
      ref={containerRef}
      key="player"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        zIndex: 2000,
        cursor: (showControls || !isPlaying) ? 'default' : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        userSelect: 'none'
      }}
      onMouseMove={resetHideTimer}
      onClick={handlePlayPause}
      onDoubleClick={toggleFullscreen}
    >
      <style>{`
        .netflix-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 4px;
          border-radius: 2px;
          background: rgba(255,255,255,0.2);
          outline: none;
          cursor: pointer;
          transition: height 0.1s ease;
        }
        .netflix-slider:hover {
          height: 6px;
        }
        .netflix-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #e50914;
          cursor: pointer;
          transition: transform 0.1s ease;
        }
        .netflix-slider:hover::-webkit-slider-thumb {
          transform: scale(1.3);
        }
        .netflix-slider::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #e50914;
          cursor: pointer;
          border: none;
          transition: transform 0.1s ease;
        }
        .netflix-slider:hover::-moz-range-thumb {
          transform: scale(1.3);
        }

        .volume-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 0px;
          height: 4px;
          border-radius: 2px;
          background: rgba(255, 255, 255, 0.3);
          outline: none;
          cursor: pointer;
          opacity: 0;
          transition: width 0.2s ease, opacity 0.2s ease;
        }
        .volume-container:hover .volume-slider, .volume-slider:focus {
          width: 70px;
          opacity: 1;
          background: #fff;
        }
        .volume-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
        }
        .volume-slider::-moz-range-thumb {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
          border: none;
        }
      `}</style>

      <video
        ref={videoRef}
        src={activeVideo?.url}
        autoPlay
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => setIsBuffering(false)}
        onEnded={() => setIsPlaying(false)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          background: '#000',
          pointerEvents: 'none'
        }}
      />

      {isBuffering && (
        <div style={{ position: 'absolute', pointerEvents: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 15 }}>
          <div style={{
            width: 70, height: 70,
            borderRadius: '50%',
            border: '4px solid rgba(229,9,20,0.1)',
            borderTop: '4px solid #e50914',
            animation: 'spin 1s linear infinite'
          }} />
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
          <span style={{ fontSize: 13, color: '#aaa', fontWeight: 600, letterSpacing: 1.5 }}>LOADING CINEMA...</span>
        </div>
      )}

      <AnimatePresence>
        {(showControls || !isPlaying) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.85) 100%)',
              pointerEvents: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '24px 30px'
            }}
          >
            {/* Header: Back Button & Ceremony Title */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                onClick={(e) => { e.stopPropagation(); onBack(); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: 600,
                  transition: 'transform 0.2s',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateX(-4px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateX(0)'}
              >
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                <span>Back to Stream Hub</span>
              </button>

              <div style={{
                color: '#fff',
                fontFamily: '"Oswald", sans-serif',
                fontSize: '1.25rem',
                fontWeight: 700,
                letterSpacing: '0.5px',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)'
              }}>
                NOW SCREENING: <span style={{ color: '#e50914' }}>{activeVideo?.title?.toUpperCase()}</span>
              </div>
            </div>

            {/* Center Row: Huge Play/Pause Overlay & 10s Skips */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 60, margin: 'auto' }}>
              <button
                onClick={(e) => skipTime(-10, e)}
                style={{ color: '#fff', cursor: 'pointer', transition: 'transform 0.15s' }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <svg viewBox="0 0 24 24" width="38" height="38" fill="currentColor">
                  <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8zm-1.33 9.48h-.76v-.35l.93-.66h.47v2.53h-.64v-1.52zm2.86-.33c0-.3-.04-.54-.12-.72a.85.85 0 0 0-.32-.38c-.14-.09-.32-.14-.54-.14s-.4.05-.54.14a.89.89 0 0 0-.31.38c-.08.18-.12.42-.12.72v.35c0 .3.04.54.12.72.08.18.18.31.31.39.14.08.32.13.54.13s.4-.05.54-.13a.9.9 0 0 0 .32-.39c.08-.18.12-.42.12-.72v-.35zm-.64-.02c0 .19-.02.34-.06.43-.04.09-.1.14-.18.14s-.14-.05-.18-.14c-.04-.09-.06-.24-.06-.43v-.32c0-.19.02-.33.06-.43.04-.09.1-.14.18-.14s.14.05.18.14c.04.09.06.24.06.43v.32z"/>
                </svg>
              </button>

              <button
                onClick={handlePlayPause}
                style={{
                  background: 'rgba(0,0,0,0.5)',
                  border: '2px solid rgba(255,255,255,0.7)',
                  borderRadius: '50%',
                  width: 80,
                  height: 80,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  cursor: 'pointer',
                  transition: 'transform 0.15s, border-color 0.15s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.borderColor = '#fff';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)';
                }}
              >
                {isPlaying ? (
                  <svg viewBox="0 0 24 24" width="34" height="34" fill="currentColor">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="34" height="34" fill="currentColor" style={{ marginLeft: 6 }}>
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>

              <button
                onClick={(e) => skipTime(10, e)}
                style={{ color: '#fff', cursor: 'pointer', transition: 'transform 0.15s' }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <svg viewBox="0 0 24 24" width="38" height="38" fill="currentColor">
                  <path d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8zm-1.33 9.48h-.76v-.35l.93-.66h.47v2.53h-.64v-1.52zm2.86-.33c0-.3-.04-.54-.12-.72a.85.85 0 0 0-.32-.38c-.14-.09-.32-.14-.54-.14s-.4.05-.54.14a.89.89 0 0 0-.31.38c-.08.18-.12.42-.12.72v.35c0 .3.04.54.12.72.08.18.18.31.31.39.14.08.32.13.54.13s.4-.05.54-.13a.9.9 0 0 0 .32-.39c.08-.18.12-.42.12-.72v-.35zm-.64-.02c0 .19-.02.34-.06.43-.04.09-.1.14-.18.14s-.14-.05-.18-.14c-.04-.09-.06-.24-.06-.43v-.32c0-.19.02-.33.06-.43.04-.09.1-.14.18-.14s.14.05.18.14c.04.09.06.24.06.43v.32z"/>
                </svg>
              </button>
            </div>

            {/* Bottom Panel: Scrubber Timeline & Bottom Sub-controls */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 15, width: '100%' }}>
              {/* Seeking Scrubber bar */}
              <div style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '0 4px' }}>
                <input
                  type="range"
                  className="netflix-slider"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    background: `linear-gradient(to right, #e50914 0%, #e50914 ${progressPercent}%, rgba(255,255,255,0.2) ${progressPercent}%, rgba(255,255,255,0.2) 100%)`
                  }}
                />
              </div>

              {/* Action Buttons Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '0 4px' }}>
                {/* Left Actions Side */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
                  {/* Play/Pause Button */}
                  <button
                    onClick={handlePlayPause}
                    style={{ color: '#fff', cursor: 'pointer', transition: 'color 0.15s' }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#e50914'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#fff'}
                  >
                    {isPlaying ? (
                      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                  </button>

                  {/* Skip Backward 10s */}
                  <button
                    onClick={(e) => skipTime(-10, e)}
                    style={{ color: '#fff', cursor: 'pointer', transition: 'color 0.15s' }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#e50914'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#fff'}
                  >
                    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
                      <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8zm-1.33 9.48h-.76v-.35l.93-.66h.47v2.53h-.64v-1.52zm2.86-.33c0-.3-.04-.54-.12-.72a.85.85 0 0 0-.32-.38c-.14-.09-.32-.14-.54-.14s-.4.05-.54.14a.89.89 0 0 0-.31.38c-.08.18-.12.42-.12.72v.35c0 .3.04.54.12.72.08.18.18.31.31.39.14.08.32.13.54.13s.4-.05.54-.13a.9.9 0 0 0 .32-.39c.08-.18.12-.42.12-.72v-.35zm-.64-.02c0 .19-.02.34-.06.43-.04.09-.1.14-.18.14s-.14-.05-.18-.14c-.04-.09-.06-.24-.06-.43v-.32c0-.19.02-.33.06-.43.04-.09.1-.14.18-.14s.14.05.18.14c.04.09.06.24.06.43v.32z"/>
                    </svg>
                  </button>

                  {/* Skip Forward 10s */}
                  <button
                    onClick={(e) => skipTime(10, e)}
                    style={{ color: '#fff', cursor: 'pointer', transition: 'color 0.15s' }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#e50914'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#fff'}
                  >
                    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
                      <path d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8zm-1.33 9.48h-.76v-.35l.93-.66h.47v2.53h-.64v-1.52zm2.86-.33c0-.3-.04-.54-.12-.72a.85.85 0 0 0-.32-.38c-.14-.09-.32-.14-.54-.14s-.4.05-.54.14a.89.89 0 0 0-.31.38c-.08.18-.12.42-.12.72v.35c0 .3.04.54.12.72.08.18.18.31.31.39.14.08.32.13.54.13s.4-.05.54-.13a.9.9 0 0 0 .32-.39c.08-.18.12-.42.12-.72v-.35zm-.64-.02c0 .19-.02.34-.06.43-.04.09-.1.14-.18.14s-.14-.05-.18-.14c-.04-.09-.06-.24-.06-.43v-.32c0-.19.02-.33.06-.43.04-.09.1-.14.18-.14s.14.05.18.14c.04.09.06.24.06.43v.32z"/>
                    </svg>
                  </button>

                  {/* Volume Speaker Controller block */}
                  <div className="volume-container" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <button
                      onClick={toggleMute}
                      style={{ color: '#fff', cursor: 'pointer', transition: 'color 0.15s' }}
                      onMouseOver={(e) => e.currentTarget.style.color = '#e50914'}
                      onMouseOut={(e) => e.currentTarget.style.color = '#fff'}
                    >
                      {isMuted ? (
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                        </svg>
                      )}
                    </button>
                    <input
                      type="range"
                      className="volume-slider"
                      min={0}
                      max={1}
                      step={0.05}
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>

                  {/* Time Indicator label */}
                  <div style={{ color: '#ccc', fontSize: 13, fontWeight: 500, letterSpacing: '0.5px' }}>
                    <span>{formatTime(currentTime)}</span>
                    <span style={{ margin: '0 6px', color: '#666' }}>/</span>
                    <span style={{ color: '#888' }}>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Right Actions Side */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 24, position: 'relative' }}>
                  {/* Speed Selector block */}
                  <div style={{ position: 'relative' }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); setShowSpeedDropdown(prev => !prev); }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        color: '#fff',
                        fontSize: 13,
                        fontWeight: 600,
                        padding: '6px 12px',
                        borderRadius: 4,
                        border: '1.5px solid rgba(255,255,255,0.3)',
                        transition: 'all 0.15s'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.borderColor = '#fff';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                        e.currentTarget.style.background = 'none';
                      }}
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M20.38 8.57l-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6l1.85-1.23A10 10 0 0 0 2 16c0 5.52 4.48 10 10 10s10-4.48 10-10a9.9 9.9 0 0 0-1.62-7.43zM12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm1-8h-2v4h2V2zm-7.66 3.05l-1.41-1.41 2.83-2.83 1.41 1.41-2.83 2.83zm13.32-1.41l-1.41 1.41 2.83 2.83 1.41-1.41-2.83-2.83z"/>
                      </svg>
                      <span>{playbackRate === 1 ? '1.0x (Normal)' : `${playbackRate}x`}</span>
                    </button>

                    {/* Speed Selector Dropdown Panel */}
                    <AnimatePresence>
                      {showSpeedDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          style={{
                            position: 'absolute',
                            bottom: '100%',
                            right: 0,
                            marginBottom: 12,
                            background: 'rgba(20,20,20,0.95)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            borderRadius: 6,
                            padding: '6px 0',
                            minWidth: 120,
                            boxShadow: '0 8px 32px rgba(0,0,0,0.8)',
                            zIndex: 2200,
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                        >
                          {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                            <button
                              key={rate}
                              onClick={(e) => handleSpeedChange(rate, e)}
                              style={{
                                width: '100%',
                                padding: '8px 16px',
                                textAlign: 'left',
                                fontSize: 13,
                                color: playbackRate === rate ? '#e50914' : '#eee',
                                fontWeight: playbackRate === rate ? '700' : '500',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.1s',
                                borderLeft: playbackRate === rate ? '3px solid #e50914' : '3px solid transparent'
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                                if (playbackRate !== rate) e.currentTarget.style.color = '#fff';
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                if (playbackRate !== rate) e.currentTarget.style.color = '#eee';
                              }}
                            >
                              {rate === 1 ? '1.0x (Normal)' : `${rate}x`}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Fullscreen Button */}
                  <button
                    onClick={toggleFullscreen}
                    style={{ color: '#fff', cursor: 'pointer', transition: 'color 0.15s' }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#e50914'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#fff'}
                  >
                    {isFullscreen ? (
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 14h6v6m10-6h-6v6M4 10h6V4m10 6h-6V4" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ============================================================
   DETAIL PAGE – NETFLIX STYLE (More Info Screen)
   ============================================================ */
const DetailPage = ({ series, onPlay, onBack, initialSeasonIdx = 0 }) => {
  const [selectedSeasonIdx, setSelectedSeasonIdx] = useState(initialSeasonIdx);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    setSelectedSeasonIdx(initialSeasonIdx);
  }, [initialSeasonIdx]);

  if (!series) return null;
  const currentSeason = series.seasons?.[selectedSeasonIdx];

  return (
    <motion.div
      key="detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, background: '#141414', zIndex: 500,
        overflowY: 'auto', fontFamily: '"Netflix Sans", "Helvetica Neue", sans-serif',
      }}
    >
      {/* Hero area */}
      <div style={{ position: 'relative', height: '56.25vw', maxHeight: '75vh', minHeight: 420, overflow: 'hidden', background: '#000' }}>
        {series.heroVideoUrl && (
          <video
            src={series.heroVideoUrl}
            autoPlay loop muted={isMuted} playsInline
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65 }}
          />
        )}
        {/* Gradient overlays */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(20,20,20,1) 0%, rgba(20,20,20,0.5) 45%, rgba(20,20,20,0) 70%), linear-gradient(to top, rgba(20,20,20,1) 0%, rgba(20,20,20,0.3) 35%, transparent 65%)'
        }} />

        {/* Back button */}
        <button
          onClick={onBack}
          style={{
            position: 'absolute', top: 24, left: '4%', zIndex: 20,
            color: '#fff', background: 'rgba(0,0,0,0.55)',
            border: '1.5px solid rgba(255,255,255,0.3)',
            borderRadius: '50%', width: 46, height: 46,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: 20, fontWeight: 700, transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.55)'; }}
        >
          &#8592;
        </button>

        {/* Hero content */}
        <div style={{ position: 'absolute', left: '4%', bottom: '12%', display: 'flex', flexDirection: 'column', gap: 14, zIndex: 10, maxWidth: 520 }}>
          <span style={{ color: '#fff', fontSize: 11, fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', opacity: 0.85 }}>
            A WEDDING ORIGINAL
          </span>
          <h1 style={{
            fontFamily: 'Hatolie, serif',
            fontSize: 'clamp(2.5rem, 4.5vw, 4.5rem)',
            fontWeight: 400, letterSpacing: '2px', color: '#fff',
            textShadow: '2px 4px 20px rgba(0,0,0,0.7)', lineHeight: 1.1,
          }}>
            {series.title}
          </h1>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button
              onClick={() => onPlay({ title: series.title, url: series.heroVideoUrl })}
              style={{
                background: '#fff', color: '#000', padding: '9px 26px', borderRadius: 4,
                fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', border: 'none',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.75)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>
              Play
            </button>
            <button style={{
              background: 'rgba(109,109,110,0.7)', color: '#fff', padding: '9px 20px', borderRadius: 4,
              fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, cursor: 'default', border: 'none',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
              More Info
            </button>
          </div>
        </div>

        {/* Mute button */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          style={{
            position: 'absolute', right: '4%', bottom: '12%', zIndex: 20,
            background: 'rgba(0,0,0,0.55)', border: '1.5px solid rgba(255,255,255,0.4)',
            color: '#fff', borderRadius: '50%', width: 42, height: 42,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.55)'; }}
        >
          {isMuted
            ? <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM12 4L9.91 6.09 12 8.18V4zm-6.41.09L4.5 5.18 8.82 9.5H3v5h4l5 5v-6.82l4.8 4.8c-.8.56-1.73.96-2.8 1.12v2.01c1.61-.22 3.09-.89 4.31-1.85l2.7 2.7 1.09-1.09L5.59 4.09z" /></svg>
            : <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
          }
        </button>
      </div>

      {/* Info section */}
      <div style={{ padding: '28px 4% 20px', background: '#141414' }}>
        <div style={{ maxWidth: 720 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
            <span style={{ color: '#46d369', fontWeight: 700, fontSize: 14 }}>{series.year}</span>
            <span style={{ color: '#aaa', fontSize: 14 }}>{series.totalSeasons} Seasons</span>
            <span style={{ border: '1px solid rgba(255,255,255,0.5)', color: '#aaa', fontSize: 10, padding: '1px 6px', fontWeight: 700, letterSpacing: 0.5 }}>HD</span>
          </div>
          <p style={{ color: '#d2d2d2', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 18 }}>
            {series.description}
          </p>
          <p style={{ fontSize: 13, color: '#777', lineHeight: 1.6 }}>
            <span style={{ color: '#999' }}>Starring: </span>
            {series.starring?.join(' \u00b7 ')}
          </p>
        </div>
      </div>

      {/* Episodes section */}
      <div style={{ padding: '0 4% 80px', background: '#141414' }}>
        <div style={{ borderTop: '1px solid #2a2a2a', paddingTop: 28, maxWidth: 900 }}>
          {/* Episodes header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff' }}>Episodes</h2>
            {series.seasons && series.seasons.length > 0 && (
              <select
                value={selectedSeasonIdx}
                onChange={e => setSelectedSeasonIdx(Number(e.target.value))}
                style={{
                  background: '#242424', color: '#fff', border: '1px solid #555',
                  padding: '8px 14px', borderRadius: 4, fontSize: 14,
                  cursor: 'pointer', outline: 'none',
                }}
              >
                {series.seasons.map((s, i) => (
                  <option key={s.id} value={i}>Season {s.seasonNumber}</option>
                ))}
              </select>
            )}
          </div>

          {/* Season subtitle */}
          {currentSeason && (
            <p style={{ fontSize: 12, color: '#777', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span>Season {currentSeason.seasonNumber}: {currentSeason.title}</span>
              {currentSeason.subtitle && <span>— {currentSeason.subtitle}</span>}
              {currentSeason.ageRating && (
                <span style={{ border: '1px solid #555', padding: '1px 5px', fontSize: 10, color: '#aaa', flexShrink: 0 }}>
                  {currentSeason.ageRating}
                </span>
              )}
            </p>
          )}

          {/* Episode list */}
          {currentSeason?.episodes?.map((ep, i) => (
            <div
              key={ep.id}
              onClick={() => onPlay({ title: ep.title, url: ep.url })}
              style={{
                display: 'flex', gap: 20, padding: '18px 0',
                borderBottom: '1px solid #2a2a2a', cursor: 'pointer',
                borderRadius: 4, transition: 'background 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            >
              {/* Episode number */}
              <div style={{ width: 28, color: '#777', fontSize: 18, fontWeight: 700, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {i + 1}
              </div>
              {/* Thumbnail */}
              <div style={{ flexShrink: 0, width: 130, height: 73, borderRadius: 4, overflow: 'hidden', background: '#2a2a2a', position: 'relative' }}>
                {ep.thumbnail ? (
                  <img src={ep.thumbnail} alt={ep.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="rgba(255,255,255,0.25)"><polygon points="5,3 19,12 5,21" /></svg>
                  </div>
                )}
              </div>
              {/* Info */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <span style={{ fontWeight: 600, color: '#fff', fontSize: 15 }}>{ep.title}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0, marginLeft: 16 }}>
                    <span style={{ color: '#aaa', fontSize: 13 }}>{ep.duration}</span>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="rgba(255,255,255,0.4)" style={{ cursor: 'pointer', flexShrink: 0 }}>
                      <path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/>
                    </svg>
                  </div>
                </div>
                <p style={{ color: '#777', fontSize: 13, lineHeight: 1.5, margin: 0 }}>{ep.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

/* ============================================================
   MAIN APPLICATION PORTAL
   ============================================================ */
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('intro');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  
  // Left sidebar navigation states
  const [activeSection, setActiveSection] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [myList, setMyList] = useState(() => {
    const saved = localStorage.getItem('wedflix_mylist');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Dynamic persistent states
  const [weddingVideos, setWeddingVideos] = useState([]);
  const [eventSettings, setEventSettings] = useState(DEFAULT_EVENT_SETTINGS);
  const [collageLayouts, setCollageLayouts] = useState(() => {
    const saved = localStorage.getItem('wedflix_collages');
    return saved ? JSON.parse(saved) : DEFAULT_COLLAGE_LAYOUTS;
  });
  const [weddingSeries, setWeddingSeries] = useState(() => {
    const saved = localStorage.getItem('wedflix_series');
    return saved ? JSON.parse(saved) : DEFAULT_SERIES;
  });
  const [selectedGalleryPhoto, setSelectedGalleryPhoto] = useState(null);

  // Visual Editor Staging States
  const [isEditMode, setIsEditMode] = useState(false);
  const [pinLoginOpen, setPinLoginOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailSeasonIdx, setDetailSeasonIdx] = useState(0);
  const [selectedEditElement, setSelectedEditElement] = useState(null); // { type, key, data }
  
  // Staging buffers for drafts
  const [draftVideos, setDraftVideos] = useState([]);
  const [draftSettings, setDraftSettings] = useState(DEFAULT_EVENT_SETTINGS);
  const [draftCollages, setDraftCollages] = useState([]);
  const [draftSeries, setDraftSeries] = useState(DEFAULT_SERIES);

  const handleStartEditMode = () => {
    setSelectedProfile({ id: 'admin', name: 'Photographer Mode', icon: 'camera', color: '#333333', role: 'admin' });
    setCurrentScreen('home');
    setDraftVideos(JSON.parse(JSON.stringify(weddingVideos)));
    setDraftSettings(JSON.parse(JSON.stringify(eventSettings)));
    setDraftCollages(JSON.parse(JSON.stringify(collageLayouts)));
    setDraftSeries(JSON.parse(JSON.stringify(weddingSeries)));
    setIsEditMode(true);
    setPinLoginOpen(false);
  };

  const handleSaveVisualChanges = async () => {
    try {
      const videosForStorage = await prepareLocalMediaForStorage(draftVideos);
      const settingsForStorage = await prepareLocalMediaForStorage(draftSettings);
      const collagesForStorage = await prepareLocalMediaForStorage(draftCollages);
      const seriesForStorage = await prepareLocalMediaForStorage(draftSeries);

      localStorage.setItem('wedflix_videos', JSON.stringify(videosForStorage));
      localStorage.setItem('wedflix_settings', JSON.stringify(settingsForStorage));
      localStorage.setItem('wedflix_collages', JSON.stringify(collagesForStorage));
      localStorage.setItem('wedflix_series', JSON.stringify(seriesForStorage));

      setWeddingVideos(draftVideos);
      setEventSettings(draftSettings);
      setCollageLayouts(draftCollages);
      setWeddingSeries(draftSeries);
      setIsEditMode(false);
      setSelectedEditElement(null);
      setSelectedProfile(null);
      setCurrentScreen('intro');
    alert("All changes saved and published successfully to the live wedding webpage.");
    } catch (error) {
      console.error('Failed to save visual changes:', error);
      alert("Save failed because the browser could not store one of the files. Try a smaller file or use a hosted/local URL like /Video/video_1.mp4.");
    }
  };

  const handleDiscardVisualChanges = () => {
    if (window.confirm("Are you sure you want to discard your visual edits? All unsaved draft adjustments will be lost.")) {
      setIsEditMode(false);
      setSelectedEditElement(null);
      setSelectedProfile(null);
      setCurrentScreen('intro');
    }
  };

  const handleSaveStagingElement = (updatedData) => {
    if (updatedData._deleteVideoId) {
      setDraftVideos(prev => prev.filter(v => v.id !== updatedData._deleteVideoId));
      setSelectedEditElement(null);
      return;
    }
    if (updatedData._deleteCollageId) {
      setDraftCollages(prev => prev.filter(c => c.id !== updatedData._deleteCollageId));
      setSelectedEditElement(null);
      return;
    }

    if (selectedEditElement.type === 'navbar-meta') {
      setDraftSettings(updatedData);
    } else if (selectedEditElement.type === 'hero') {
      const mappedData = {
        ...draftSettings,
        ...updatedData,
        coupleName: updatedData.title || updatedData.coupleName || draftSettings.coupleName,
        weddingVenue: updatedData.locationTag || updatedData.weddingVenue || draftSettings.weddingVenue,
        customGreeting: updatedData.customGreeting || draftSettings.customGreeting,
        heroVideoUrl: updatedData.heroVideoUrl || draftSettings.heroVideoUrl,
      };
      setDraftSettings(mappedData);
    } else if (selectedEditElement.type === 'card') {
      const vidId = selectedEditElement.key;
      setDraftVideos(prev => prev.map(v => v.id === vidId ? { ...v, ...updatedData } : v));
    } else if (selectedEditElement.type === 'collage-slot') {
      const { collageId, slotKey } = selectedEditElement.key;
      setDraftCollages(prev => prev.map(c => {
        if (c.id === collageId) {
          return {
            ...c,
            slots: {
              ...c.slots,
              [slotKey]: {
                url: updatedData.url,
                urlLocalMediaId: updatedData.urlLocalMediaId,
                caption: updatedData.caption
              }
            }
          };
        }
        return c;
      }));
    } else if (selectedEditElement.type === 'new-video') {
      const newVid = {
        ...updatedData,
        id: `video_${Date.now()}`,
        category: updatedData.category || 'Trending Now',
        color: updatedData.color || '#e50914',
        duration: updatedData.duration || '05:00',
        match: Number(updatedData.match) || 98,
        isTrending: updatedData.category === 'Trending Now',
        isTop10: false,
      };
      setDraftVideos(prev => [...prev, newVid]);
    } else if (selectedEditElement.type === 'new-collage') {
      const type = updatedData.type || 'mosaic';
      const maxSlots = (type === 'quad' || type === 'spotlight') ? 4 : 3;
      const slots = {};
      for (let i = 1; i <= maxSlots; i++) {
        slots[`slot${i}`] = { url: '', caption: '' };
      }
      const newCollage = {
        id: `collage_${Date.now()}`,
        name: updatedData.name || 'New Album',
        type,
        slots
      };
      setDraftCollages(prev => [...prev, newCollage]);
    } else if (selectedEditElement.type === 'edit-collage-meta') {
      const collageId = selectedEditElement.key;
      setDraftCollages(prev => prev.map(c => {
        if (c.id === collageId) {
          return {
            ...c,
            name: updatedData.name || c.name,
            type: updatedData.type || c.type,
          };
        }
        return c;
      }));
    } else if (selectedEditElement.type === 'new-season') {
      const nextSeasonNum = draftSeries.seasons.length + 1;
      const newSeason = {
        id: `season_${Date.now()}`,
        title: updatedData.title || `NEW SEASON ${nextSeasonNum}`,
        seasonNumber: nextSeasonNum,
        subtitle: updatedData.subtitle || '',
        ageRating: updatedData.ageRating || 'U/A 16+',
        thumbnail: updatedData.thumbnail || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
        thumbnailLocalMediaId: updatedData.thumbnailLocalMediaId,
        seasonLabel: updatedData.seasonLabel || `Season ${nextSeasonNum}`,
        episodes: []
      };
      setDraftSeries(prev => ({
        ...prev,
        totalSeasons: prev.seasons.length + 1,
        seasons: [...prev.seasons, newSeason]
      }));
    } else if (selectedEditElement.type === 'new-episode') {
      const seasonIdx = Number(updatedData.seasonIdx) || 0;
      const newEpisode = {
        id: `ep_${Date.now()}`,
        title: updatedData.title || 'New Highlight',
        description: updatedData.description || '',
        duration: updatedData.duration || '2m',
        thumbnail: updatedData.thumbnail || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=300&q=80',
        thumbnailLocalMediaId: updatedData.thumbnailLocalMediaId,
        url: updatedData.url || '/Video/video_1.mp4',
        urlLocalMediaId: updatedData.urlLocalMediaId
      };
      setDraftSeries(prev => {
        const copy = JSON.parse(JSON.stringify(prev));
        if (copy.seasons && copy.seasons[seasonIdx]) {
          copy.seasons[seasonIdx].episodes.push(newEpisode);
        }
        return copy;
      });
    }
    setSelectedEditElement(null);
  };

  const scrollRef = useRef(null);

  useEffect(() => {
    const savedVideos = localStorage.getItem('wedflix_videos');
    const savedSettings = localStorage.getItem('wedflix_settings');
    const savedCollages = localStorage.getItem('wedflix_collages');
    const savedSeries = localStorage.getItem('wedflix_series');

    // ── Data Version Check ──────────────────────────────────────────────────
    // v5: Reset default videos to beautiful wedding highlight collections.
    const DATA_VERSION = 'v5';
    const storedVersion = localStorage.getItem('wedflix_data_version');
    const needsVersionReset = storedVersion !== DATA_VERSION;

    if (needsVersionReset || !savedVideos) {
      // Full reset to latest DEFAULT_VIDEOS (real URLs + correct thumbnails)
      setWeddingVideos(DEFAULT_VIDEOS);
      localStorage.setItem('wedflix_videos', JSON.stringify(DEFAULT_VIDEOS));
      localStorage.setItem('wedflix_data_version', DATA_VERSION);
      
      // Reset settings to new defaults
      setEventSettings(DEFAULT_EVENT_SETTINGS);
      localStorage.setItem('wedflix_settings', JSON.stringify(DEFAULT_EVENT_SETTINGS));

      // Reset series
      setWeddingSeries(DEFAULT_SERIES);
      localStorage.setItem('wedflix_series', JSON.stringify(DEFAULT_SERIES));
    } else {
      // Saved data exists and version matches — apply incremental upgrades only
      let parsed = JSON.parse(savedVideos);
      let upgraded = false;

      // Guard: upgrade any video that still carries a placeholder URL
      const PLACEHOLDER_YT_ID = 'ysz5S6PUM-U';
      const parsedUpgraded = parsed.map(v => {
        const matchingDefault = DEFAULT_VIDEOS.find(dv => dv.id === v.id);
        const oldBrokenThumbnails = [
          'photo-1595152230535-0952d4393047',
          'photo-1519225495810-7512c696505a',
          'photo-1610030474322-261a8ef1bf5c',
          'photo-1591604466107-ec97de577fad'
        ];

        let updatedVideo = { ...v };

        // Upgrade placeholder URL to real URL
        if (matchingDefault && v.url && v.url.includes(PLACEHOLDER_YT_ID)) {
          updatedVideo = { ...updatedVideo, url: matchingDefault.url };
          upgraded = true;
        }

        // Upgrade broken thumbnails
        const needsThumbnailUpgrade = matchingDefault && (
          !v.thumbnail ||
          oldBrokenThumbnails.some(broken => v.thumbnail.includes(broken))
        );
        if (needsThumbnailUpgrade) {
          updatedVideo = { ...updatedVideo, thumbnail: matchingDefault.thumbnail };
          upgraded = true;
        }

        return updatedVideo;
      });

      if (upgraded) {
        hydrateLocalMediaRefs(parsedUpgraded).then(setWeddingVideos).catch(() => setWeddingVideos(parsedUpgraded));
        localStorage.setItem('wedflix_videos', JSON.stringify(parsedUpgraded));
      } else {
        hydrateLocalMediaRefs(parsed).then(setWeddingVideos).catch(() => setWeddingVideos(parsed));
      }
    }

    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      hydrateLocalMediaRefs(parsedSettings).then(setEventSettings).catch(() => setEventSettings(parsedSettings));
    } else {
      setEventSettings(DEFAULT_EVENT_SETTINGS);
      localStorage.setItem('wedflix_settings', JSON.stringify(DEFAULT_EVENT_SETTINGS));
    }

    if (savedCollages) {
      const parsedCollages = JSON.parse(savedCollages);
      hydrateLocalMediaRefs(parsedCollages).then(setCollageLayouts).catch(() => setCollageLayouts(parsedCollages));
    }

    if (savedSeries) {
      const parsedSeries = JSON.parse(savedSeries);
      hydrateLocalMediaRefs(parsedSeries).then(setWeddingSeries).catch(() => setWeddingSeries(parsedSeries));
    } else {
      setWeddingSeries(DEFAULT_SERIES);
      localStorage.setItem('wedflix_series', JSON.stringify(DEFAULT_SERIES));
    }
  }, []);

  const handleSaveSettings = (newSettings) => {
    setEventSettings(newSettings);
    localStorage.setItem('wedflix_settings', JSON.stringify(newSettings));
  };

  const handleSaveCollages = (newCollages) => {
    setCollageLayouts(newCollages);
    localStorage.setItem('wedflix_collages', JSON.stringify(newCollages));
  };

  const handleAddVideo = (newVid) => {
    const updated = [...weddingVideos, newVid];
    setWeddingVideos(updated);
    localStorage.setItem('wedflix_videos', JSON.stringify(updated));
  };

  const handleDeleteVideo = (id) => {
    const updated = weddingVideos.filter(v => v.id !== id);
    setWeddingVideos(updated);
    localStorage.setItem('wedflix_videos', JSON.stringify(updated));
  };

  const handleEditVideo = (updatedVideo) => {
    const updated = weddingVideos.map(v => v.id === updatedVideo.id ? updatedVideo : v);
    setWeddingVideos(updated);
    localStorage.setItem('wedflix_videos', JSON.stringify(updated));
  };

  const handleScroll = useCallback(() => {
    if (scrollRef.current) setScrolled(scrollRef.current.scrollTop > 60);
  }, []);

  const handleToggleFavorite = (video) => {
    setMyList(prev => {
      const exists = prev.some(v => v.id === video.id);
      const updated = exists ? prev.filter(v => v.id !== video.id) : [...prev, video];
      localStorage.setItem('wedflix_mylist', JSON.stringify(updated));
      return updated;
    });
  };

  // Filter video categories (Fashion & Prep, Feast & Banquet, Rituals & Celebrations)
  const activeVideosSource = isEditMode ? draftVideos : weddingVideos;
  const trendingNow = activeVideosSource.filter(v => v.isTrending);
  const fashionBeauty = activeVideosSource.filter(v => v.category === 'Fashion & Beauty');
  const foodDrinks = activeVideosSource.filter(v => v.category === 'Food & Drinks');
  const lifestyleWellness = activeVideosSource.filter(v => v.category === 'Lifestyle & Wellness');
  const top10Highlights = activeVideosSource.filter(v => v.isTop10).sort((a,b) => (a.rank || 0) - (b.rank || 0));

  const matchedVideos = activeVideosSource.filter(v => 
    v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (v.description && v.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleProfileSelect = (profile) => {
    if (profile.role === 'admin') {
      setPinLoginOpen(true);
    } else {
      setSelectedProfile(profile);
      setCurrentScreen('home');
    }
  };

  return (
    <>
      <GlobalStyles />
      <div className={isEditMode ? 'edit-mode-active' : ''} style={{ width: '100vw', minHeight: '100vh', background: '#141414', overflow: 'hidden', position: 'relative' }}>
        {isEditMode && (
          <VisualEditorBar
            onSave={handleSaveVisualChanges}
            onDiscard={handleDiscardVisualChanges}
            onAddVideo={() => setSelectedEditElement({
              type: 'new-video',
              key: 'new-video',
              data: { title: '', category: 'Trending Now', duration: '05:00', match: 98, thumbnail: '', url: '' }
            })}
            onAddCollage={() => {
              setActiveSection('gallery');
              setSelectedEditElement({
                type: 'new-collage',
                key: 'new-collage',
                data: { name: '', type: 'mosaic' }
              });
            }}
            onAddSeason={() => setSelectedEditElement({
              type: 'new-season',
              key: 'new-season',
              data: { title: '', seasonLabel: '', subtitle: '', ageRating: 'U/A 16+', thumbnail: '' }
            })}
            onAddEpisode={() => setSelectedEditElement({
              type: 'new-episode',
              key: 'new-episode',
              data: { seasonIdx: 0, title: '', description: '', duration: '2m', thumbnail: '', url: '' }
            })}
          />
        )}
        <AnimatePresence>
          {pinLoginOpen && (
            <PinLoginScreen
              onSuccess={handleStartEditMode}
              onCancel={() => setPinLoginOpen(false)}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {selectedEditElement && (
            <SectionEditorModal
              selectedElement={selectedEditElement}
              onSave={handleSaveStagingElement}
              onClose={() => setSelectedEditElement(null)}
              seasons={(isEditMode ? draftSeries : weddingSeries).seasons}
            />
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {/* Welcome Screen: Pure Netflix Intro Video */}
          {currentScreen === 'intro' && (
            <IntroScreen
              key="intro"
              onComplete={() => setCurrentScreen('profiles')}
            />
          )}

          {/* Profile Selector Screen */}
          {currentScreen === 'profiles' && (
            <ProfileScreen
              key="profiles"
              coupleName={eventSettings.coupleName}
              onSelect={handleProfileSelect}
            />
          )}

          {/* Home stream portal */}
          {currentScreen === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{ position: 'fixed', inset: 0, top: isEditMode ? '50px' : 0, background: '#141414', overflow: 'hidden' }}
            >
              <Navbar
                scrolled={scrolled}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                profile={selectedProfile}
                onSwitchProfile={(p) => {
                  if (p) {
                    if (p.role === 'admin') {
                      setPinLoginOpen(true);
                    } else {
                      setSelectedProfile(p);
                    }
                  } else {
                    setCurrentScreen('intro');
                    setSelectedProfile(null);
                  }
                }}
                onOpenEditorLogin={() => setPinLoginOpen(true)}
                isEditMode={isEditMode}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />

              <div
                ref={scrollRef}
                onScroll={handleScroll}
                style={{ width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden', paddingLeft: 0 }}
              >
                {activeSection === 'home' && (
                  <>
                    <HeroSection
                      settings={isEditMode ? draftSettings : eventSettings}
                      onPlay={(v) => {
                        setActiveVideo(v);
                        setCurrentScreen('player');
                      }}
                      onMoreInfo={() => setDetailOpen(true)}
                      isEditMode={isEditMode}
                      onEditClick={setSelectedEditElement}
                    />

                    {/* Rows Carousel Grid */}
                    <div style={{ marginTop: -80, position: 'relative', zIndex: 20 }}>
                      {/* The Celebration Series */}
                      <ContentRow
                        title="The Celebration Series"
                        shows={(isEditMode ? draftSeries : weddingSeries).seasons.map((s, idx) => ({
                          id: s.id, title: s.title, seasonLabel: s.seasonLabel,
                          thumbnail: s.thumbnail, url: s.episodes[0]?.url || '',
                          color: '#e50914', duration: '', match: 99, category: 'Seasons',
                          seasonIdx: idx
                        }))}
                        onPlay={(v) => {
                          setDetailSeasonIdx(v.seasonIdx !== undefined ? v.seasonIdx : 0);
                          setDetailOpen(true);
                        }}
                        myList={myList}
                        onToggleFavorite={handleToggleFavorite}
                        isEditMode={isEditMode}
                        onEditClick={setSelectedEditElement}
                        onMoreInfo={(v) => {
                          setDetailSeasonIdx(v?.seasonIdx !== undefined ? v.seasonIdx : 0);
                          setDetailOpen(true);
                        }}
                      />

                      {/* Our Films Row */}
                      <ContentRow
                        title="Our Film"
                        shows={DEFAULT_FILMS}
                        onPlay={(v) => { setActiveVideo(v); setCurrentScreen('player'); }}
                        myList={myList}
                        onToggleFavorite={handleToggleFavorite}
                        isEditMode={isEditMode}
                        onEditClick={setSelectedEditElement}
                        onMoreInfo={() => setDetailOpen(true)}
                      />

                      {/* Heartfelt Moments Row */}
                      <ContentRow
                        title="Heartfelt Moments"
                        shows={weddingVideos.length > 0 ? weddingVideos : trendingNow}
                        onPlay={(v) => { setActiveVideo(v); setCurrentScreen('player'); }}
                        myList={myList}
                        onToggleFavorite={handleToggleFavorite}
                        isEditMode={isEditMode}
                        onEditClick={setSelectedEditElement}
                        onMoreInfo={() => setDetailOpen(true)}
                      />
                    </div>
                  </>
                )}

                {activeSection === 'search' && (
                  <div style={{ padding: '100px 4% 40px' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span>Search Stream Hub</span>
                    </h1>
                    
                    <div style={{ position: 'relative', width: '100%', maxWidth: 500, marginBottom: 40 }}>
                      <input
                        type="text"
                        placeholder="Search titles, categories, or tags..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '14px 18px 14px 46px',
                          fontSize: '1rem',
                          color: '#fff',
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.15)',
                          borderRadius: 8,
                          outline: 'none',
                          transition: 'all 0.3s ease',
                          fontFamily: 'inherit'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#e50914';
                          e.target.style.background = 'rgba(255,255,255,0.1)';
                          e.target.style.boxShadow = '0 0 15px rgba(229,9,20,0.3)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                          e.target.style.background = 'rgba(255,255,255,0.06)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                      <div style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                      </div>
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: '#fff', background: 'none', border: 'none', fontSize: 18, padding: 0 }}
                        >
                          &times;
                        </button>
                      )}
                    </div>

                    {matchedVideos.length > 0 ? (
                      <div>
                        <h2 style={{ fontSize: '1.2rem', color: '#aaa', fontWeight: 600, marginBottom: 20 }}>Showing {matchedVideos.length} results</h2>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px 16px' }}>
                          {matchedVideos.map(show => (
                            <ContentCard
                              key={show.id}
                              show={show}
                              onPlay={(v) => { setActiveVideo(v); setCurrentScreen('player'); }}
                              myList={myList}
                              onToggleFavorite={handleToggleFavorite}
                            />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div style={{ textAlign: 'center', padding: '60px 0', color: '#666' }}>
                        <span style={{ fontSize: 48, display: 'block', marginBottom: 16 }}>🔍</span>
                        <p style={{ fontSize: 16, fontWeight: 500, color: '#aaa' }}>No video moments match your search query.</p>
                        <p style={{ fontSize: 13, marginTop: 4 }}>Try searching for categories like "Beauty", "Food", "Wellness", or "Trending".</p>
                      </div>
                    )}
                  </div>
                )}

                {activeSection === 'seasons' && (
                  <div style={{ padding: '100px 0 40px' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', fontFamily: 'Hatolie, serif', padding: '0 4%', marginBottom: 8 }}>The Celebration Series</h1>
                    <p style={{ padding: '0 4%', color: '#aaa', fontSize: 14, marginBottom: 32 }}>All seasons from the wedding celebration</p>
                    {(isEditMode ? draftSeries : weddingSeries).seasons.map((s, idx) => {
                      const colors = ['#e50914', '#8e44ad', '#c0392b', '#16a085', '#d35400', '#2980b9'];
                      const rowColor = colors[idx % colors.length];
                      return (
                        <ContentRow
                          key={s.id}
                          title={`${s.seasonLabel || `Season ${idx+1}`} — ${s.title}`}
                          shows={(s.episodes || []).map(ep => ({
                            id: ep.id, title: ep.title, seasonLabel: `${s.seasonLabel || `Season ${idx+1}`} • ${ep.duration}`,
                            thumbnail: ep.thumbnail, url: ep.url, color: rowColor, duration: ep.duration, match: 99, category: 'Episodes',
                          }))}
                          onPlay={(v) => { setActiveVideo(v); setCurrentScreen('player'); }}
                          myList={myList}
                          onToggleFavorite={handleToggleFavorite}
                          isEditMode={isEditMode}
                          onEditClick={setSelectedEditElement}
                          onMoreInfo={() => {
                            setDetailSeasonIdx(idx);
                            setDetailOpen(true);
                          }}
                        />
                      );
                    })}
                  </div>
                )}

                {activeSection === 'films' && (
                  <div style={{ padding: '100px 0 40px' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', fontFamily: 'Hatolie, serif', padding: '0 4%', marginBottom: 32 }}>Our Films</h1>
                    <ContentRow
                      title="Our Film"
                      shows={DEFAULT_FILMS}
                      onPlay={(v) => { setActiveVideo(v); setCurrentScreen('player'); }}
                      myList={myList}
                      onToggleFavorite={handleToggleFavorite}
                      isEditMode={isEditMode}
                      onEditClick={setSelectedEditElement}
                      onMoreInfo={() => setDetailOpen(true)}
                    />
                  </div>
                )}

                {activeSection === 'moments' && (
                  <div style={{ padding: '100px 0 40px' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', fontFamily: 'Hatolie, serif', padding: '0 4%', marginBottom: 32 }}>Little Moments</h1>
                    <ContentRow
                      title="Heartfelt Moments"
                      shows={weddingVideos.length > 0 ? weddingVideos : trendingNow}
                      onPlay={(v) => { setActiveVideo(v); setCurrentScreen('player'); }}
                      myList={myList}
                      onToggleFavorite={handleToggleFavorite}
                      isEditMode={isEditMode}
                      onEditClick={setSelectedEditElement}
                      onMoreInfo={() => setDetailOpen(true)}
                    />
                    <ContentRow
                      title="Behind The Scenes"
                      shows={fashionBeauty}
                      onPlay={(v) => { setActiveVideo(v); setCurrentScreen('player'); }}
                      myList={myList}
                      onToggleFavorite={handleToggleFavorite}
                      isEditMode={isEditMode}
                      onEditClick={setSelectedEditElement}
                      onMoreInfo={() => setDetailOpen(true)}
                    />
                  </div>
                )}

                {activeSection === 'gallery' && (
                  <div style={{ padding: '100px 4% 40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                      <button
                        onClick={() => setActiveSection('home')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 8,
                          color: '#fff',
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          borderRadius: '20px',
                          padding: '8px 18px',
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.16)';
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                          e.currentTarget.style.transform = 'translateX(-2px)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                          e.currentTarget.style.transform = 'none';
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="19" y1="12" x2="5" y2="12"></line>
                          <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        <span>Back to Home</span>
                      </button>
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', marginBottom: 8 }}>Wedding Gallery</h1>
                    <p style={{ fontSize: '0.95rem', color: '#aaa', marginBottom: 40 }}>
                      Browse beautiful moments captured by the photographer in custom collages.
                    </p>

                    {(() => {
                      const activeCollagesSource = isEditMode ? draftCollages : collageLayouts;
                      return activeCollagesSource.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 50 }}>
                          {activeCollagesSource.map((collage) => {
                            const hasPhotos = Object.values(collage.slots).some(slot => !!slot.url);
                            
                            return (
                              <div key={collage.id} style={{ background: '#1c1c1c', border: '1px solid #292929', borderRadius: 12, padding: '24px 4%', width: '100%', maxWidth: 1000, margin: '0 auto', boxShadow: '0 8px 30px rgba(0,0,0,0.5)' }}>
                                <h2 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: 16, fontFamily: 'Hatolie', letterSpacing: '0.5px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <span
                                    className={isEditMode ? 'editable-visual-element' : ''}
                                    style={{ cursor: isEditMode ? 'pointer' : 'default', display: 'flex', alignItems: 'center', gap: 8 }}
                                    onClick={() => {
                                      if (isEditMode) {
                                        setSelectedEditElement({
                                          type: 'edit-collage-meta',
                                          key: collage.id,
                                          data: { name: collage.name, type: collage.type }
                                        });
                                      }
                                    }}
                                  >
                                    {collage.name} {isEditMode && <span style={{ fontSize: 10, color: '#aaa', fontWeight: 400, border: '1px solid rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: 4, textTransform: 'none', letterSpacing: '0px', fontFamily: '"Netflix Sans", sans-serif', marginLeft: 8, display: 'inline-flex', alignItems: 'center', gap: 4 }}><AppIcon type="edit" size={10} /> Edit Album Info / Delete</span>}
                                  </span>
                                  <span style={{ fontSize: '0.8rem', color: '#e50914', background: 'rgba(229,9,20,0.1)', padding: '4px 10px', borderRadius: 4, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
                                    {collage.type === 'mosaic' && 'Mosaic Grid'}
                                    {collage.type === 'portrait-row' && 'Portrait Columns'}
                                    {collage.type === 'quad' && 'Symmetrical Quad'}
                                    {collage.type === 'spotlight' && 'Spotlight Grid'}
                                  </span>
                                </h2>

                                {hasPhotos || isEditMode ? (
                                  <div className={`${collage.type}-layout`} style={{ gap: 12 }}>
                                    {Object.keys(collage.slots).map((slotKey) => {
                                      const slot = collage.slots[slotKey];
                                      const slotNum = slotKey.replace('slot', '');
                                      const isFilled = !!slot?.url;

                                      return (
                                        <div
                                          key={slotKey}
                                          className={`collage-slot ${collage.type}-slot-${slotNum} ${isFilled ? 'filled' : ''} ${isEditMode ? 'editable-visual-element' : ''}`}
                                          style={{
                                            backgroundImage: isFilled ? `url(${slot.url})` : 'none',
                                            height: '100%',
                                            border: isFilled ? 'none' : '1px dashed rgba(255,255,255,0.15)',
                                            cursor: (isFilled || isEditMode) ? 'pointer' : 'default',
                                          }}
                                          onClick={() => {
                                            if (isEditMode) {
                                              setSelectedEditElement({
                                                type: 'collage-slot',
                                                key: { collageId: collage.id, slotKey },
                                                data: slot || { url: '', caption: '' }
                                              });
                                            } else if (isFilled) {
                                              setSelectedGalleryPhoto(slot.url);
                                            }
                                          }}
                                        >
                                          {isEditMode && <div className="edit-badge" style={{ fontSize: 8, padding: '2px 5px' }}><AppIcon type="edit" size={8} /> Edit Slot</div>}
                                          {isFilled && (
                                            <div className="collage-slot-overlay">
                                              <p style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', color: '#e50914', marginBottom: 4 }}>Moment {slotNum}</p>
                                              <p style={{ fontSize: 12, color: '#fff', padding: '0 8px' }}>{slot.caption || 'Beautiful Vows'}</p>
                                            </div>
                                          )}
                                          {!isFilled && (
                                            <div style={{ color: '#444', fontSize: 11, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                              <span>No photo set</span>
                                              {isEditMode && <span style={{ color: '#e50914', fontSize: 10, marginTop: 4 }}>[Click to Add]</span>}
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                ) : (
                                  <div style={{ textAlign: 'center', padding: '40px 0', color: '#555' }}>
                                    <span style={{ color: '#666', display: 'inline-flex', marginBottom: 12 }}><AppIcon type="camera" size={32} /></span>
                                    <p style={{ fontSize: 13, color: '#888' }}>This album is currently empty. The photographer is updating the photos.</p>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div style={{ textAlign: 'center', padding: '80px 0', color: '#666' }}>
                          <span style={{ color: '#666', display: 'inline-flex', marginBottom: 16 }}><AppIcon type="image" size={48} /></span>
                          <p style={{ fontSize: 16, fontWeight: 500, color: '#aaa' }}>No collage albums published yet.</p>
                          <p style={{ fontSize: 13, marginTop: 4 }}>Photographer can publish custom photo collages from the Photographer Console.</p>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {activeSection === 'mylist' && (
                  <div style={{ padding: '100px 4% 40px' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', marginBottom: 8 }}>My List</h1>
                    <p style={{ fontSize: '0.95rem', color: '#aaa', marginBottom: 32 }}>Your handpicked collections of favorite video clips.</p>

                    {myList.length > 0 ? (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px 16px' }}>
                        {myList.map(show => (
                          <ContentCard
                            key={show.id}
                            show={show}
                            onPlay={(v) => { setActiveVideo(v); setCurrentScreen('player'); }}
                            myList={myList}
                            onToggleFavorite={handleToggleFavorite}
                          />
                        ))}
                      </div>
                    ) : (
                      <div style={{
                        textAlign: 'center',
                        padding: '80px 40px',
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px dashed rgba(255,255,255,0.1)',
                        borderRadius: 8,
                        maxWidth: 600,
                        margin: '0 auto'
                      }}>
                        <div style={{ fontSize: 42, color: '#e50914', marginBottom: 16 }}>+</div>
                        <h3 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 700, marginBottom: 8 }}>Your list is empty</h3>
                        <p style={{ fontSize: '0.9rem', color: '#aaa', lineHeight: 1.5 }}>
                          Explore the streaming catalog and tap the plus icon on any card's popup details to save it to your dashboard.
                        </p>
                        <button
                          onClick={() => setActiveSection('home')}
                          style={{
                            background: '#e50914',
                            color: '#fff',
                            padding: '10px 24px',
                            borderRadius: 4,
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            marginTop: 20,
                            transition: 'background 0.2s'
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = '#b81d24'}
                          onMouseLeave={e => e.currentTarget.style.background = '#e50914'}
                        >
                          Browse Stream Catalogue
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Footer */}
                <footer style={{ padding: '60px 4% 40px', color: '#555', fontSize: 13, borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: 40 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
                    <div>
                      <NetflixLogo width={120} height={36} />
                      <p style={{ marginTop: 8, color: '#444', fontSize: 12 }}>Custom Cinematic Stream Hub built for brand promotions.</p>
                    </div>
                    <div style={{ display: 'flex', gap: 40 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <span style={{ color: '#fff', fontWeight: 600 }}>Brand Services</span>
                        <span>Full Resolution Raw Access</span>
                        <span>Client Deliverables</span>
                        <span>SaaS Templates</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <span style={{ color: '#fff', fontWeight: 600 }}>Help Desk</span>
                        <span>FAQs</span>
                        <span>Support Team</span>
                        <span>Terms & Conditions</span>
                      </div>
                    </div>
                  </div>
                  <p style={{ color: '#333', fontSize: 11, marginTop: 24, textAlign: 'center' }}>© 2026 Flix Origin. Custom Brand Stream Platform.</p>
                </footer>
              </div>
            </motion.div>
          )}

          {/* Full Screen Cinema Player */}
          {currentScreen === 'player' && (
            <PlayerScreen
              key="player"
              activeVideo={activeVideo}
              onBack={() => {
                setCurrentScreen('home');
                setActiveVideo(null);
              }}
            />
          )}
        </AnimatePresence>

        {/* Admin Dashboard Control Console */}
        <AnimatePresence>
          {adminOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ zIndex: 3000, position: 'relative' }}
            >
              <AdminPanel
                videos={weddingVideos}
                eventSettings={eventSettings}
                onSaveSettings={handleSaveSettings}
                onAddVideo={handleAddVideo}
                onDeleteVideo={handleDeleteVideo}
                onEditVideo={handleEditVideo}
                collageLayouts={collageLayouts}
                onSaveCollages={handleSaveCollages}
                onClose={() => setAdminOpen(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Detail Page Screen */}
        <AnimatePresence>
          {detailOpen && (
            <DetailPage
              series={isEditMode ? draftSeries : weddingSeries}
              initialSeasonIdx={detailSeasonIdx}
              onPlay={(v) => {
                setActiveVideo(v);
                setCurrentScreen('player');
              }}
              onBack={() => setDetailOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Lightbox / Gallery Photo Viewer */}
        <AnimatePresence>
          {selectedGalleryPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGalleryPhoto(null)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.92)',
                zIndex: 4000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 24,
                cursor: 'zoom-out',
              }}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                style={{ position: 'relative', maxWidth: '90%', maxHeight: '90%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <img
                  src={selectedGalleryPhoto}
                  alt="Wedding Moment Zoomed"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '85vh',
                    borderRadius: 8,
                    boxShadow: '0 10px 40px rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    objectFit: 'contain',
                  }}
                />
                <button
                  onClick={() => setSelectedGalleryPhoto(null)}
                  style={{
                    position: 'absolute',
                    top: -40,
                    right: 0,
                    color: '#fff',
                    background: 'rgba(255,255,255,0.1)',
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                    cursor: 'pointer',
                  }}
                >
                  &times;
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
