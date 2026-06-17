  import { useState, useEffect, useCallback } from "react"

/* =========================================================
   VARUN EXPRESS — PREMIUM MOBILE ACCESSORIES STORE
   Full upgraded version with:
   - React Router-style navigation
   - Smooth premium animations
   - Search bar on Store page
   - 10-15 branded phones with real images & prices
   - Product detail modal with Buy + Add to Cart
   - Rich festival offers
   - Premium About Us with background
   - Fast, smooth performance
   ========================================================= */

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --blue: #1a8fff;
    --blue-bright: #00c3ff;
    --blue-dim: #0c5fa3;
    --bg: #030812;
    --bg2: #050e1e;
    --card: rgba(10, 20, 38, 0.7);
    --border: rgba(26,143,255,0.15);
    --border-bright: rgba(0,195,255,0.4);
    --text: #e8f4ff;
    --muted: #6a8eb2;
    --neon: rgba(0,195,255,0.35);
    --gold: #ffd700;
    --green: #00e676;
    --red: #ff5252;
    --orange: #ff9800;
    --pink: #ff4081;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    overflow-x: hidden;
    line-height: 1.6;
  }

  body::before {
    content: '';
    position: fixed; inset: 0;
    background:
      radial-gradient(ellipse 800px 500px at 20% 10%, rgba(0,100,255,0.04) 0%, transparent 70%),
      radial-gradient(ellipse 600px 400px at 80% 80%, rgba(0,195,255,0.03) 0%, transparent 70%),
      linear-gradient(rgba(26,143,255,0.015) 1px, transparent 1px),
      linear-gradient(90deg, rgba(26,143,255,0.015) 1px, transparent 1px);
    background-size: auto, auto, 48px 48px, 48px 48px;
    pointer-events: none;
    z-index: 0;
  }

  /* ── SCROLLBAR ── */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #030812; }
  ::-webkit-scrollbar-thumb { background: var(--blue-dim); border-radius: 3px; }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }
  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to   { transform: translateX(0); opacity: 1; }
  }
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 10px var(--neon); }
    50%       { box-shadow: 0 0 25px var(--neon), 0 0 50px rgba(0,195,255,0.2); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-12px); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes scan {
    0%   { top: -2px; }
    100% { top: 100%; }
  }
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes heroText {
    from { opacity: 0; transform: translateY(40px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes particleDrift {
    0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0.6; }
    50%  { opacity: 0.3; }
    100% { transform: translateY(-120px) translateX(20px) scale(0.5); opacity: 0; }
  }
  @keyframes badgePop {
    0%   { transform: scale(0.8) translateY(10px); opacity: 0; }
    70%  { transform: scale(1.05); }
    100% { transform: scale(1) translateY(0); opacity: 1; }
  }
  @keyframes countUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes borderFlow {
    0%   { border-color: rgba(26,143,255,0.2); }
    50%  { border-color: rgba(0,195,255,0.6); }
    100% { border-color: rgba(26,143,255,0.2); }
  }

  /* ── NAVBAR ── */
  .navbar {
    position: sticky; top: 0; z-index: 200;
    background: rgba(3,8,18,0.85);
    backdrop-filter: blur(24px) saturate(1.8);
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center;
    padding: 0 48px; height: 72px; gap: 32px;
    transition: background 0.3s, box-shadow 0.3s;
  }
  .navbar.scrolled {
    background: rgba(3,8,18,0.97);
    box-shadow: 0 4px 30px rgba(0,0,0,0.5);
  }
  .logo {
    display: flex; align-items: center; gap: 12px;
    margin-right: auto; cursor: pointer; text-decoration: none;
    transition: transform 0.3s;
  }
  .logo:hover { transform: scale(1.03); }
  .logo-icon { width: 38px; height: 38px; filter: drop-shadow(0 0 8px var(--blue-bright)); }
  .logo-text {
    font-family: 'Rajdhani', sans-serif;
    font-size: 24px; font-weight: 700; letter-spacing: 2.5px; color: #fff;
  }
  .logo-text span { color: var(--blue-bright); }

  .nav-links { display: flex; gap: 4px; align-items: center; }
  .nav-link {
    font-size: 13px; font-weight: 600; letter-spacing: 0.8px; text-transform: uppercase;
    color: var(--muted); cursor: pointer; padding: 6px 14px; border-radius: 8px;
    transition: all 0.25s; position: relative; user-select: none;
  }
  .nav-link::after {
    content: ''; position: absolute; bottom: 0; left: 50%; right: 50%;
    height: 2px; background: var(--blue-bright); border-radius: 2px;
    transition: all 0.25s;
  }
  .nav-link:hover { color: #fff; background: rgba(255,255,255,0.04); }
  .nav-link:hover::after, .nav-link.active::after { left: 14px; right: 14px; }
  .nav-link.active { color: var(--blue-bright); }

  .cart-btn {
    position: relative; background: rgba(26,143,255,0.12); border: 1px solid var(--border);
    padding: 9px 18px; border-radius: 40px; color: #fff; font-weight: 600;
    font-size: 14px; cursor: pointer; display: flex; align-items: center; gap: 8px;
    transition: all 0.3s; font-family: 'DM Sans', sans-serif;
  }
  .cart-btn:hover { background: var(--blue); border-color: var(--blue-bright); box-shadow: 0 0 20px var(--neon); }
  .cart-count {
    background: var(--blue-bright); color: #000; font-size: 11px; font-weight: 800;
    padding: 2px 7px; border-radius: 12px; animation: pulse-glow 2s infinite;
  }

  /* ── PAGE WRAPPER ── */
  .page-enter {
    animation: fadeIn 0.4s ease both;
  }

  /* ── HERO ── */
  .hero {
    min-height: 92vh;
    background:
      linear-gradient(105deg, #030812 0%, rgba(3,8,18,0.9) 40%, rgba(3,8,18,0.4) 100%),
      url('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=2000&q=85') no-repeat center/cover;
    display: flex; align-items: center; padding: 60px 80px;
    position: relative; overflow: hidden;
  }
  .hero::after {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse 60% 80% at 80% 50%, rgba(0,195,255,0.06) 0%, transparent 70%);
    pointer-events: none;
  }

  /* Floating particles */
  .particle {
    position: absolute; width: 4px; height: 4px; border-radius: 50%;
    background: var(--blue-bright); animation: particleDrift linear infinite;
    pointer-events: none;
  }

  .hero-content { z-index: 2; max-width: 700px; }
  .hero-eyebrow {
    font-size: 12px; letter-spacing: 5px; color: var(--blue-bright);
    text-transform: uppercase; font-weight: 700; margin-bottom: 20px;
    display: flex; align-items: center; gap: 10px;
    animation: fadeUp 0.7s 0.1s both;
  }
  .eyebrow-line { width: 40px; height: 1px; background: var(--blue-bright); }

  .hero-title {
    font-family: 'Rajdhani', sans-serif;
    font-size: clamp(52px, 7.5vw, 90px);
    font-weight: 700; line-height: 0.92; color: #fff;
    animation: heroText 0.8s 0.2s both;
  }
  .hero-title .accent {
    background: linear-gradient(90deg, #00c3ff 0%, #00ffaa 60%, #fff 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 2px 15px rgba(0,195,255,0.4));
    display: block;
  }
  .hero-sub {
    font-size: 18px; color: var(--muted); margin: 24px 0 36px;
    max-width: 520px; line-height: 1.7;
    animation: fadeUp 0.8s 0.35s both;
  }

  .hero-badges { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 40px; animation: fadeUp 0.8s 0.45s both; }
  .h-badge {
    display: flex; align-items: center; gap: 8px;
    font-size: 12px; font-weight: 600; padding: 9px 16px; border-radius: 30px;
    background: rgba(10,20,38,0.8); border: 1px solid var(--border);
    color: var(--text); backdrop-filter: blur(10px);
    transition: all 0.3s;
  }
  .h-badge:hover { border-color: var(--blue-bright); color: var(--blue-bright); transform: translateY(-2px); }

  .hero-ctas { display: flex; gap: 16px; flex-wrap: wrap; animation: fadeUp 0.8s 0.55s both; }
  .btn-primary {
    padding: 15px 34px; border-radius: 50px; border: none;
    background: linear-gradient(135deg, var(--blue) 0%, #0066cc 100%);
    color: #fff; font-family: 'DM Sans', sans-serif;
    font-size: 15px; font-weight: 700; cursor: pointer;
    transition: all 0.3s; letter-spacing: 0.3px;
    box-shadow: 0 4px 20px rgba(26,143,255,0.4);
  }
  .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 8px 30px rgba(0,195,255,0.5); background: linear-gradient(135deg, #00c3ff 0%, var(--blue) 100%); }
  .btn-outline {
    padding: 14px 34px; border-radius: 50px;
    border: 1.5px solid var(--border-bright);
    background: rgba(0,195,255,0.05);
    color: var(--blue-bright); font-family: 'DM Sans', sans-serif;
    font-size: 15px; font-weight: 600; cursor: pointer;
    transition: all 0.3s;
  }
  .btn-outline:hover { background: rgba(0,195,255,0.12); transform: translateY(-3px); }

  /* Cat pills */
  .hero-cats { margin-top: 56px; animation: fadeUp 0.8s 0.65s both; }
  .hero-cats-label { font-size: 11px; letter-spacing: 4px; color: var(--muted); text-transform: uppercase; margin-bottom: 16px; }
  .cats-row { display: flex; gap: 10px; flex-wrap: wrap; }
  .cat-pill {
    display: flex; align-items: center; gap: 8px;
    padding: 10px 18px; border-radius: 10px; cursor: pointer;
    background: rgba(26,143,255,0.05); border: 1px solid var(--border);
    font-size: 12px; font-weight: 600; color: var(--muted);
    text-transform: uppercase; letter-spacing: 0.5px;
    transition: all 0.3s; backdrop-filter: blur(10px);
  }
  .cat-pill:hover {
    border-color: var(--blue-bright); color: #fff;
    background: rgba(26,143,255,0.15);
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0,195,255,0.2);
  }

  /* Brands scroll */
  .brands-ticker {
    background: rgba(3,8,18,0.95); border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border); padding: 18px 0;
    overflow: hidden; position: relative;
  }
  .brands-ticker::before, .brands-ticker::after {
    content: ''; position: absolute; top: 0; width: 120px; height: 100%; z-index: 2;
  }
  .brands-ticker::before { left: 0; background: linear-gradient(90deg, rgba(3,8,18,1), transparent); }
  .brands-ticker::after { right: 0; background: linear-gradient(-90deg, rgba(3,8,18,1), transparent); }
  @keyframes tickerScroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .ticker-inner { display: flex; gap: 60px; animation: tickerScroll 20s linear infinite; width: max-content; }
  .ticker-brand {
    font-family: 'Rajdhani', sans-serif; font-size: 16px; font-weight: 700;
    color: var(--muted); letter-spacing: 3px; text-transform: uppercase;
    cursor: pointer; transition: color 0.3s; white-space: nowrap;
    display: flex; align-items: center; gap: 12px;
  }
  .ticker-brand:hover { color: var(--blue-bright); }
  .ticker-sep { color: rgba(26,143,255,0.3); }

  /* ── STORE PAGE ── */
  .page { padding: 70px 60px; min-height: 90vh; position: relative; z-index: 1; }
  .page-header { margin-bottom: 48px; animation: fadeUp 0.6s both; }
  .section-label {
    font-size: 11px; letter-spacing: 5px; text-transform: uppercase;
    color: var(--blue-bright); font-weight: 700; margin-bottom: 10px;
    display: flex; align-items: center; gap: 10px;
  }
  .section-label::before { content: ''; width: 20px; height: 1px; background: var(--blue-bright); }
  .page-title { font-family: 'Rajdhani', sans-serif; font-size: 50px; font-weight: 700; line-height: 1; margin-bottom: 12px; }
  .page-title span { color: var(--blue-bright); }
  .page-sub { color: var(--muted); font-size: 16px; max-width: 600px; }

  /* Store Controls */
  .store-controls {
    display: flex; gap: 16px; margin-bottom: 36px; flex-wrap: wrap; align-items: center;
    animation: fadeUp 0.6s 0.1s both;
  }
  .search-wrap {
    position: relative; flex: 1; min-width: 240px; max-width: 420px;
  }
  .search-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--muted); font-size: 16px; pointer-events: none; }
  .search-input {
    width: 100%; padding: 12px 16px 12px 46px;
    background: rgba(10,20,38,0.7); border: 1px solid var(--border);
    border-radius: 12px; color: var(--text); font-family: 'DM Sans', sans-serif;
    font-size: 14px; outline: none; transition: all 0.3s;
    backdrop-filter: blur(10px);
  }
  .search-input::placeholder { color: var(--muted); }
  .search-input:focus { border-color: var(--blue-bright); box-shadow: 0 0 0 3px rgba(0,195,255,0.1); }
  .search-clear {
    position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
    background: none; border: none; color: var(--muted); cursor: pointer; font-size: 18px;
    padding: 2px; transition: color 0.2s;
  }
  .search-clear:hover { color: var(--text); }

  .filter-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 36px; animation: fadeUp 0.6s 0.15s both; }
  .filter-btn {
    padding: 9px 20px; border-radius: 30px; border: 1px solid var(--border);
    background: rgba(10,20,38,0.5); color: var(--muted); font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.25s;
  }
  .filter-btn:hover { border-color: var(--blue); color: var(--text); background: rgba(26,143,255,0.1); }
  .filter-btn.active { background: var(--blue); border-color: var(--blue-bright); color: #fff; box-shadow: 0 0 15px rgba(26,143,255,0.4); }

  .results-count { font-size: 13px; color: var(--muted); margin-bottom: 28px; animation: fadeIn 0.4s both; }
  .results-count strong { color: var(--blue-bright); }

  /* Store Grid */
  .store-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; }
  .store-card {
    background: rgba(10,20,38,0.5); border: 1px solid var(--border);
    border-radius: 20px; padding: 0; cursor: pointer;
    transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
    position: relative; overflow: hidden; backdrop-filter: blur(12px);
    animation: fadeUp 0.5s both;
  }
  .store-card:hover { border-color: var(--blue-bright); transform: translateY(-8px); box-shadow: 0 20px 50px rgba(0,195,255,0.15); }
  .store-card::before {
    content: ''; position: absolute; inset: 0; border-radius: 20px;
    background: linear-gradient(135deg, rgba(0,195,255,0.05) 0%, transparent 60%);
    opacity: 0; transition: opacity 0.4s;
  }
  .store-card:hover::before { opacity: 1; }

  .card-img-wrap {
    width: 100%; height: 220px; background: #071122;
    position: relative; overflow: hidden; border-radius: 20px 20px 0 0;
    display: flex; align-items: center; justify-content: center;
  }
  .card-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }
  .store-card:hover .card-img { transform: scale(1.08); }
  .card-img-overlay {
    position: absolute; inset: 0; background: linear-gradient(180deg, transparent 50%, rgba(5,14,26,0.6) 100%);
  }

  .s-badge {
    position: absolute; top: 16px; left: 16px; z-index: 2;
    font-size: 10px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;
    padding: 4px 10px; border-radius: 20px;
    background: rgba(3,8,18,0.88); color: var(--blue-bright);
    border: 1px solid rgba(0,195,255,0.4); backdrop-filter: blur(5px);
  }
  .s-badge.sale { color: #ff5252; border-color: rgba(255,82,82,0.4); }
  .s-badge.new { color: #00e676; border-color: rgba(0,230,118,0.4); }

  .card-body { padding: 18px 20px 20px; }
  .s-brand { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--blue-bright); margin-bottom: 6px; }
  .s-name { font-size: 15px; font-weight: 600; color: #fff; line-height: 1.4; margin-bottom: 12px; min-height: 42px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .price-row { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
  .s-price { font-family: 'Rajdhani', sans-serif; font-size: 22px; font-weight: 700; color: var(--blue-bright); }
  .s-old { font-size: 13px; color: var(--muted); text-decoration: line-through; }
  .s-save { font-size: 11px; font-weight: 700; color: var(--green); background: rgba(0,230,118,0.1); padding: 2px 8px; border-radius: 20px; }

  .card-actions { display: flex; gap: 8px; }
  .add-btn {
    flex: 1; padding: 11px 0; border-radius: 10px;
    background: rgba(26,143,255,0.1); border: 1px solid var(--border);
    color: var(--blue-bright); font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.3s;
  }
  .add-btn:hover { background: var(--blue); color: #fff; border-color: var(--blue-bright); box-shadow: 0 0 15px var(--neon); }
  .view-btn {
    padding: 11px 16px; border-radius: 10px;
    background: rgba(255,255,255,0.04); border: 1px solid var(--border);
    color: var(--muted); font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.3s;
  }
  .view-btn:hover { color: var(--text); border-color: rgba(255,255,255,0.2); }

  .no-results { text-align: center; padding: 80px 20px; color: var(--muted); }
  .no-results .nr-icon { font-size: 60px; margin-bottom: 16px; display: block; }
  .no-results h3 { font-size: 22px; color: var(--text); margin-bottom: 8px; }

  /* ── PRODUCT MODAL ── */
  .modal-overlay {
    position: fixed; inset: 0; z-index: 500;
    background: rgba(0,0,0,0.85); backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center;
    padding: 20px; animation: fadeIn 0.25s both;
  }
  .modal-box {
    background: #060f1e; border: 1px solid var(--border-bright);
    border-radius: 28px; max-width: 900px; width: 100%;
    max-height: 90vh; overflow-y: auto;
    animation: fadeUp 0.35s cubic-bezier(0.16,1,0.3,1) both;
    position: relative;
  }
  .modal-close {
    position: sticky; top: 16px; left: 100%; float: right; margin: 16px 16px -8px 0;
    width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--border);
    background: rgba(10,20,38,0.9); color: var(--muted); cursor: pointer;
    font-size: 20px; display: flex; align-items: center; justify-content: center;
    transition: all 0.2s; z-index: 10;
  }
  .modal-close:hover { color: #fff; border-color: var(--text); background: rgba(255,255,255,0.1); }
  .modal-inner { display: grid; grid-template-columns: 1fr 1fr; }
  .modal-img-side {
    background: #071122; border-radius: 28px 0 0 28px;
    min-height: 480px; position: relative; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
  }
  .modal-img { width: 100%; height: 100%; object-fit: cover; }
  .modal-img-badge {
    position: absolute; top: 20px; left: 20px;
    font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;
    padding: 6px 14px; border-radius: 30px;
    background: rgba(3,8,18,0.9); color: var(--blue-bright);
    border: 1px solid rgba(0,195,255,0.5);
  }
  .modal-info-side { padding: 40px 36px 36px; display: flex; flex-direction: column; }
  .modal-brand { font-size: 12px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--blue-bright); margin-bottom: 10px; }
  .modal-name { font-family: 'Rajdhani', sans-serif; font-size: 30px; font-weight: 700; color: #fff; line-height: 1.2; margin-bottom: 16px; }
  .modal-price-row { display: flex; align-items: baseline; gap: 14px; margin-bottom: 6px; }
  .modal-price { font-family: 'Rajdhani', sans-serif; font-size: 38px; font-weight: 700; color: var(--blue-bright); }
  .modal-old { font-size: 18px; color: var(--muted); text-decoration: line-through; }
  .modal-save { font-size: 14px; font-weight: 700; color: var(--green); }
  .modal-rating { display: flex; align-items: center; gap: 6px; margin-bottom: 24px; font-size: 14px; color: var(--muted); }
  .stars { color: var(--gold); letter-spacing: 1px; }

  .modal-desc { font-size: 14px; color: var(--muted); line-height: 1.8; margin-bottom: 24px; flex: 1; }
  .modal-specs { margin-bottom: 28px; }
  .specs-title { font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--text); margin-bottom: 12px; }
  .spec-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.04); font-size: 13px; }
  .spec-key { color: var(--muted); }
  .spec-val { color: var(--text); font-weight: 500; }

  .modal-actions { display: flex; gap: 12px; }
  .btn-buy {
    flex: 1; padding: 15px; border-radius: 12px; border: none;
    background: linear-gradient(135deg, #00c3ff 0%, var(--blue) 100%);
    color: #fff; font-family: 'DM Sans', sans-serif;
    font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.3s;
    box-shadow: 0 4px 20px rgba(0,195,255,0.3);
  }
  .btn-buy:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,195,255,0.45); }
  .btn-cart {
    flex: 1; padding: 15px; border-radius: 12px;
    border: 1.5px solid var(--border-bright);
    background: rgba(0,195,255,0.07);
    color: var(--blue-bright); font-family: 'DM Sans', sans-serif;
    font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.3s;
  }
  .btn-cart:hover { background: rgba(0,195,255,0.15); transform: translateY(-2px); }

  /* ── PAYMENT MODAL ── */
  .payment-overlay {
    position: fixed; inset: 0; z-index: 600;
    background: rgba(0,0,0,0.92); backdrop-filter: blur(12px);
    display: flex; align-items: center; justify-content: center;
    padding: 20px; animation: fadeIn 0.2s both;
  }
  .payment-box {
    background: #060f1e; border: 1px solid var(--border-bright);
    border-radius: 24px; max-width: 480px; width: 100%;
    padding: 40px; animation: fadeUp 0.3s cubic-bezier(0.16,1,0.3,1) both;
    position: relative;
  }
  .payment-close {
    position: absolute; top: 16px; right: 16px;
    width: 34px; height: 34px; border-radius: 50%; border: 1px solid var(--border);
    background: rgba(10,20,38,0.9); color: var(--muted); cursor: pointer;
    font-size: 18px; display: flex; align-items: center; justify-content: center;
    transition: all 0.2s;
  }
  .payment-close:hover { color: #fff; border-color: var(--text); }
  .payment-title {
    font-family: 'Rajdhani', sans-serif; font-size: 26px; font-weight: 700;
    color: #fff; margin-bottom: 4px;
  }
  .payment-product {
    font-size: 13px; color: var(--muted); margin-bottom: 6px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .payment-amount {
    font-family: 'Rajdhani', sans-serif; font-size: 32px; font-weight: 700;
    color: var(--blue-bright); margin-bottom: 28px;
  }
  .payment-divider {
    font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
    color: var(--muted); margin-bottom: 16px;
    display: flex; align-items: center; gap: 12px;
  }
  .payment-divider::before, .payment-divider::after {
    content: ''; flex: 1; height: 1px; background: var(--border);
  }
  .payment-option {
    display: flex; align-items: center; gap: 18px;
    padding: 20px 22px; border-radius: 14px; cursor: pointer;
    border: 1.5px solid var(--border); background: rgba(10,20,38,0.5);
    transition: all 0.3s; margin-bottom: 12px;
  }
  .payment-option:hover { border-color: var(--blue-bright); background: rgba(0,195,255,0.06); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,195,255,0.15); }
  .payment-option.selected { border-color: var(--blue-bright); background: rgba(0,195,255,0.1); }
  .po-icon { font-size: 32px; flex-shrink: 0; }
  .po-info { flex: 1; }
  .po-label { font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 3px; }
  .po-desc { font-size: 12px; color: var(--muted); }
  .po-check {
    width: 22px; height: 22px; border-radius: 50%; border: 2px solid var(--border);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    transition: all 0.2s;
  }
  .payment-option.selected .po-check {
    border-color: var(--blue-bright); background: var(--blue-bright);
    color: #000; font-size: 12px; font-weight: 900;
  }
  .payment-upi-field {
    margin-top: 12px; padding: 0 0 12px;
  }
  .payment-upi-field input {
    width: 100%; padding: 13px 16px;
    background: rgba(3,8,18,0.7); border: 1px solid var(--border);
    border-radius: 10px; color: var(--text); font-family: 'DM Sans', sans-serif;
    font-size: 14px; outline: none; transition: all 0.3s;
  }
  .payment-upi-field input:focus { border-color: var(--blue-bright); box-shadow: 0 0 0 3px rgba(0,195,255,0.1); }
  .payment-upi-field input::placeholder { color: var(--muted); }
  .payment-confirm-btn {
    width: 100%; padding: 16px; border-radius: 12px; border: none; margin-top: 8px;
    background: linear-gradient(135deg, #00c3ff 0%, var(--blue) 100%);
    color: #fff; font-family: 'DM Sans', sans-serif;
    font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.3s;
    box-shadow: 0 4px 20px rgba(0,195,255,0.3); letter-spacing: 0.3px;
  }
  .payment-confirm-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,195,255,0.45); }
  .payment-confirm-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }
  .payment-success {
    text-align: center; padding: 20px 0 10px;
  }
  .payment-success-icon { font-size: 64px; margin-bottom: 16px; display: block; animation: badgePop 0.5s both; }
  .payment-success h3 { font-family: 'Rajdhani', sans-serif; font-size: 28px; font-weight: 700; color: #fff; margin-bottom: 8px; }
  .payment-success p { font-size: 14px; color: var(--muted); line-height: 1.7; }

  /* ── CART PANEL ── */
  .cart-overlay {
    position: fixed; inset: 0; z-index: 300;
    background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);
    animation: fadeIn 0.2s both;
  }
  .cart-panel {
    position: fixed; top: 0; right: 0; width: 420px; height: 100vh; z-index: 400;
    background: rgba(4,11,22,0.98); backdrop-filter: blur(30px);
    border-left: 1px solid var(--border); padding: 0;
    display: flex; flex-direction: column;
    animation: slideInRight 0.35s cubic-bezier(0.16,1,0.3,1) both;
    box-shadow: -10px 0 50px rgba(0,0,0,0.6);
  }
  .cart-top { padding: 28px 28px 20px; border-bottom: 1px solid var(--border); }
  .cart-header-row { display: flex; align-items: center; justify-content: space-between; }
  .cart-title { font-family: 'Rajdhani', sans-serif; font-size: 26px; font-weight: 700; }
  .close-cart {
    width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--border);
    background: transparent; color: var(--muted); cursor: pointer; font-size: 20px;
    display: flex; align-items: center; justify-content: center; transition: all 0.2s;
  }
  .close-cart:hover { color: #fff; border-color: var(--text); }
  .cart-count-label { font-size: 13px; color: var(--muted); margin-top: 4px; }

  .cart-items { flex: 1; overflow-y: auto; padding: 16px 28px; display: flex; flex-direction: column; gap: 14px; }
  .cart-empty { text-align: center; padding: 60px 20px; color: var(--muted); }
  .cart-empty-icon { font-size: 48px; display: block; margin-bottom: 12px; }
  .cart-item {
    display: flex; gap: 14px; background: rgba(255,255,255,0.03);
    padding: 14px; border-radius: 14px; border: 1px solid var(--border);
    animation: fadeUp 0.3s both;
  }
  .ci-img { width: 64px; height: 64px; border-radius: 10px; object-fit: cover; flex-shrink: 0; }
  .ci-info { flex: 1; min-width: 0; }
  .ci-name { font-size: 13px; font-weight: 600; color: #fff; margin-bottom: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .ci-price { font-size: 14px; font-weight: 700; color: var(--blue-bright); margin-bottom: 8px; }
  .qty-row { display: flex; align-items: center; gap: 10px; }
  .qty-btn {
    width: 26px; height: 26px; border-radius: 8px; border: 1px solid var(--border);
    background: rgba(255,255,255,0.05); color: #fff; cursor: pointer;
    font-size: 15px; display: flex; align-items: center; justify-content: center;
    transition: background 0.2s;
  }
  .qty-btn:hover { background: var(--blue); }
  .qty-num { font-size: 14px; font-weight: 700; min-width: 20px; text-align: center; }
  .ci-del { background: none; border: none; color: var(--muted); cursor: pointer; font-size: 18px; padding: 4px; transition: color 0.2s; }
  .ci-del:hover { color: var(--red); }

  .cart-foot {
    padding: 20px 28px 28px; border-top: 1px solid var(--border);
    background: rgba(3,8,18,0.5);
  }
  .cart-total { display: flex; justify-content: space-between; margin-bottom: 18px; }
  .ct-label { font-size: 15px; color: var(--muted); }
  .ct-val { font-family: 'Rajdhani', sans-serif; font-size: 26px; font-weight: 700; color: var(--blue-bright); }
  .checkout-btn {
    width: 100%; padding: 16px; border-radius: 14px; border: none;
    background: linear-gradient(135deg, var(--blue) 0%, #0066cc 100%);
    color: #fff; font-family: 'DM Sans', sans-serif;
    font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.3s;
    box-shadow: 0 4px 20px rgba(26,143,255,0.3);
  }
  .checkout-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(26,143,255,0.45); }

  /* ── OFFERS PAGE ── */
  .offers-hero {
    background: linear-gradient(135deg, rgba(3,8,18,1) 0%, rgba(5,14,26,0.95) 100%),
    url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1600&q=80') no-repeat center/cover;
    padding: 60px 60px 40px; margin-bottom: 48px;
    border-radius: 24px; border: 1px solid var(--border);
    position: relative; overflow: hidden;
  }
  .offers-hero::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse 70% 70% at 90% 50%, rgba(255,152,0,0.06) 0%, transparent 70%);
  }

  .festival-tag {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase;
    padding: 6px 14px; border-radius: 30px; margin-bottom: 12px;
  }
  .fest-diwali { background: rgba(255,215,0,0.1); color: var(--gold); border: 1px solid rgba(255,215,0,0.3); }
  .fest-republic { background: rgba(255,87,34,0.1); color: #ff7043; border: 1px solid rgba(255,87,34,0.3); }
  .fest-holi { background: rgba(233,30,99,0.12); color: #f06292; border: 1px solid rgba(233,30,99,0.35); }
  .fest-eid { background: rgba(0,200,83,0.1); color: #69f0ae; border: 1px solid rgba(0,200,83,0.3); }
  .fest-christmas { background: rgba(255,82,82,0.1); color: #ff8a80; border: 1px solid rgba(255,82,82,0.3); }
  .fest-flash { background: rgba(0,195,255,0.1); color: var(--blue-bright); border: 1px solid rgba(0,195,255,0.3); }
  .fest-independence { background: rgba(255,171,0,0.1); color: #ffca28; border: 1px solid rgba(255,171,0,0.3); }

  .offers-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }
  .offer-card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 22px; padding: 30px; backdrop-filter: blur(12px);
    transition: all 0.35s; position: relative; overflow: hidden;
    animation: fadeUp 0.5s both;
    cursor: pointer;
  }
  .offer-card::before {
    content: ''; position: absolute; top: -1px; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--blue-bright), transparent);
    opacity: 0; transition: opacity 0.35s;
  }
  .offer-card:hover { border-color: var(--blue-bright); transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,195,255,0.12); }
  .offer-card:hover::before { opacity: 1; }

  .oc-discount {
    font-family: 'Rajdhani', sans-serif; font-size: 58px; font-weight: 700;
    line-height: 1; margin: 12px 0;
  }
  .oc-title { font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 8px; }
  .oc-desc { font-size: 14px; color: var(--muted); line-height: 1.7; margin-bottom: 20px; }
  .oc-validity { font-size: 12px; color: var(--muted); margin-bottom: 20px; }
  .code-box {
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(26,143,255,0.05); border: 1px dashed rgba(26,143,255,0.35);
    border-radius: 10px; padding: 12px 16px;
  }
  .code-label { font-size: 11px; color: var(--muted); margin-bottom: 2px; }
  .code-val { font-family: 'Rajdhani', sans-serif; font-size: 20px; font-weight: 700; color: var(--blue-bright); letter-spacing: 3px; }
  .copy-btn {
    background: rgba(26,143,255,0.1); border: 1px solid var(--border);
    color: var(--blue-bright); font-size: 12px; font-weight: 700;
    padding: 6px 12px; border-radius: 8px; cursor: pointer; transition: all 0.2s;
    font-family: 'DM Sans', sans-serif; white-space: nowrap;
  }
  .copy-btn:hover { background: var(--blue); color: #fff; }
  .copy-btn.copied { background: rgba(0,230,118,0.15); border-color: rgba(0,230,118,0.4); color: var(--green); }

  /* ── ABOUT PAGE ── */
  .about-hero {
    position: relative; border-radius: 28px; overflow: hidden;
    margin-bottom: 60px; min-height: 480px;
    display: flex; align-items: center;
  }
  .about-hero-bg {
    position: absolute; inset: 0;
    background: url('https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1800&q=85') no-repeat center/cover;
  }
  .about-hero-bg::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg, rgba(3,8,18,0.95) 0%, rgba(3,8,18,0.7) 60%, rgba(3,8,18,0.4) 100%);
  }
  .about-hero-content { position: relative; z-index: 1; padding: 60px; max-width: 600px; }
  .about-hero-title { font-family: 'Rajdhani', sans-serif; font-size: 52px; font-weight: 700; margin-bottom: 20px; color: #fff; }
  .about-hero-title span { color: var(--blue-bright); }
  .about-hero-text { font-size: 16px; color: var(--muted); line-height: 1.8; margin-bottom: 28px; }

  .about-floating-card {
    position: absolute; right: 60px; top: 50%; transform: translateY(-50%);
    background: rgba(5,14,26,0.9); backdrop-filter: blur(20px);
    border: 1px solid var(--border-bright); border-radius: 24px; padding: 36px;
    text-align: center; animation: float 5s ease-in-out infinite;
    box-shadow: 0 20px 60px rgba(0,195,255,0.2);
  }
  .afc-icon { font-size: 72px; filter: drop-shadow(0 0 20px var(--blue-bright)); margin-bottom: 16px; display: block; }
  .afc-tagline { font-family: 'Rajdhani', sans-serif; font-size: 22px; font-weight: 700; color: var(--blue-bright); line-height: 1.3; }

  .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 60px; }
  .stat-card {
    background: rgba(10,20,38,0.6); border: 1px solid var(--border);
    border-radius: 20px; padding: 32px 20px; text-align: center;
    backdrop-filter: blur(12px); transition: all 0.35s;
    animation: fadeUp 0.5s both;
  }
  .stat-card:hover { border-color: var(--blue-bright); transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,195,255,0.15); }
  .stat-num { font-family: 'Rajdhani', sans-serif; font-size: 48px; font-weight: 700; color: var(--blue-bright); }
  .stat-label { font-size: 12px; color: var(--muted); text-transform: uppercase; letter-spacing: 2px; margin-top: 6px; }

  .about-story {
    display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-bottom: 60px; align-items: center;
  }
  .about-story-img-wrap {
    border-radius: 24px; overflow: hidden; height: 420px;
    position: relative;
  }
  .about-story-img { width: 100%; height: 100%; object-fit: cover; }
  .about-story-img-wrap::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(180deg, transparent 50%, rgba(3,8,18,0.7) 100%);
  }
  .about-story-text h2 { font-family: 'Rajdhani', sans-serif; font-size: 38px; font-weight: 700; margin-bottom: 20px; }
  .about-story-text p { font-size: 15px; color: var(--muted); line-height: 1.9; margin-bottom: 16px; }

  .values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 60px; }
  .value-card {
    background: rgba(10,20,38,0.5); border: 1px solid var(--border);
    border-radius: 20px; padding: 28px; backdrop-filter: blur(12px); transition: all 0.35s;
  }
  .value-card:hover { border-color: var(--blue-bright); transform: translateY(-4px); }
  .v-icon { font-size: 36px; margin-bottom: 16px; display: block; }
  .v-title { font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 8px; }
  .v-desc { font-size: 14px; color: var(--muted); line-height: 1.7; }

  .brands-showcase { margin-bottom: 60px; }
  .brands-showcase h2 { font-family: 'Rajdhani', sans-serif; font-size: 32px; font-weight: 700; margin-bottom: 28px; }
  .brands-logos { display: flex; flex-wrap: wrap; gap: 16px; }
  .brand-logo-card {
    background: rgba(10,20,38,0.6); border: 1px solid var(--border);
    border-radius: 14px; padding: 18px 28px;
    font-family: 'Rajdhani', sans-serif; font-size: 18px; font-weight: 700;
    color: var(--muted); letter-spacing: 2px; text-transform: uppercase;
    transition: all 0.3s; cursor: pointer; backdrop-filter: blur(10px);
  }
  .brand-logo-card:hover { color: var(--blue-bright); border-color: var(--blue-bright); background: rgba(0,195,255,0.05); }

  /* ── CONTACT PAGE ── */
  .contact-hero {
    position: relative; border-radius: 24px; overflow: hidden; margin-bottom: 48px;
    background: linear-gradient(135deg, rgba(3,8,18,0.98) 0%, rgba(5,14,26,0.95) 100%),
    url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=1600&q=80') no-repeat center/cover;
    padding: 60px; border: 1px solid var(--border);
  }
  .contact-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 48px; }
  .contact-info-col { display: flex; flex-direction: column; gap: 20px; }
  .contact-card {
    background: rgba(10,20,38,0.6); border: 1px solid var(--border);
    border-radius: 18px; padding: 24px 26px; display: flex; gap: 18px;
    backdrop-filter: blur(12px); transition: all 0.3s;
    animation: fadeUp 0.5s both;
  }
  .contact-card:hover { border-color: var(--blue-bright); transform: translateX(4px); }
  .cc-icon { font-size: 28px; flex-shrink: 0; }
  .cc-title { font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--blue-bright); margin-bottom: 6px; }
  .cc-val { font-size: 14px; color: var(--text); line-height: 1.6; }

  .contact-form-card {
    background: rgba(10,20,38,0.6); border: 1px solid var(--border);
    border-radius: 24px; padding: 40px; backdrop-filter: blur(12px);
    animation: fadeUp 0.5s 0.1s both;
  }
  .cf-title { font-family: 'Rajdhani', sans-serif; font-size: 28px; font-weight: 700; margin-bottom: 28px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .field { margin-bottom: 18px; }
  .field label { font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--muted); display: block; margin-bottom: 8px; }
  .field input, .field textarea, .field select {
    width: 100%; padding: 13px 16px;
    background: rgba(3,8,18,0.7); border: 1px solid var(--border);
    border-radius: 10px; color: var(--text); font-family: 'DM Sans', sans-serif;
    font-size: 14px; outline: none; transition: all 0.3s; resize: none;
  }
  .field input:focus, .field textarea:focus, .field select:focus { border-color: var(--blue-bright); box-shadow: 0 0 0 3px rgba(0,195,255,0.1); }
  .field select option { background: #050d1a; }
  .field textarea { min-height: 110px; }
  .submit-btn {
    width: 100%; padding: 16px; border-radius: 12px; border: none;
    background: linear-gradient(135deg, var(--blue) 0%, #0066cc 100%);
    color: #fff; font-family: 'DM Sans', sans-serif;
    font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.3s;
    box-shadow: 0 4px 20px rgba(26,143,255,0.3); letter-spacing: 0.3px;
  }
  .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(26,143,255,0.45); }

  /* ── FOOTER ── */
  .footer { background: #02050c; border-top: 1px solid var(--border); padding: 20px 60px; display: flex; align-items: center; justify-content: center; font-size: 13px; color: var(--muted); gap: 6px; }

  /* ── RESPONSIVE ── */
  @media (max-width: 1024px) {
    .about-story, .contact-grid { grid-template-columns: 1fr; }
    .stats-row { grid-template-columns: repeat(2, 1fr); }
    .values-grid { grid-template-columns: repeat(2, 1fr); }
    .about-floating-card { display: none; }
    .modal-inner { grid-template-columns: 1fr; }
    .modal-img-side { border-radius: 28px 28px 0 0; min-height: 280px; }
  }
  @media (max-width: 768px) {
    .navbar { padding: 0 20px; height: 64px; }
    .nav-links { display: none; }
    .hero { padding: 40px 28px; background-position: 75% center; }
    .hero-title { font-size: 48px; }
    .page { padding: 50px 24px; }
    .page-title { font-size: 38px; }
    .cart-panel { width: 100%; }
    .about-hero-content { padding: 36px; }
    .about-hero-title { font-size: 36px; }
    .contact-hero { padding: 36px; }
    .contact-form-card { padding: 24px; }
    .form-row { grid-template-columns: 1fr; }
    .values-grid { grid-template-columns: 1fr; }
    .offers-hero { padding: 36px; }
  }
`;

/* ═══════════════════ DATA ═══════════════════ */

const PHONES = [
  {
    id: 101, cat: "Phones",
    brand: "Apple", name: "iPhone 16 Pro Max 256GB — Natural Titanium",
    price: 134900, old: 144900,
    img: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&w=600&q=85",
    badge: "FLAGSHIP",
    rating: 4.9, reviews: 8420,
    desc: "Apple's most powerful iPhone ever. A18 Pro chip, 48MP camera system with 5x telephoto, ProMotion 120Hz Super Retina XDR display, and titanium frame.",
    specs: [
      ["Display", "6.9\" Super Retina XDR, 120Hz"],
      ["Chip", "A18 Pro"],
      ["Camera", "48MP Main + 48MP Ultra Wide + 12MP 5x Tele"],
      ["Battery", "4685 mAh"],
      ["Storage", "256GB"],
      ["OS", "iOS 18"]
    ]
  },
  {
    id: 102, cat: "Phones",
    brand: "Samsung", name: "Galaxy S25 Ultra 512GB — Titanium Black",
    price: 139999, old: 152999,
    img: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=85",
    badge: "ULTRA",
    rating: 4.8, reviews: 6210,
    desc: "Galaxy AI meets next-level performance. Snapdragon 8 Elite, 200MP camera, built-in S Pen, and a massive 5000mAh battery.",
    specs: [
      ["Display", "6.9\" Dynamic AMOLED 2X, 120Hz"],
      ["Chip", "Snapdragon 8 Elite"],
      ["Camera", "200MP Main + 50MP Ultra Wide + 50MP 5x Tele"],
      ["Battery", "5000 mAh"],
      ["Storage", "512GB"],
      ["OS", "Android 15 / OneUI 7"]
    ]
  },
  {
    id: 103, cat: "Phones",
    brand: "OnePlus", name: "OnePlus 13 256GB — Midnight Ocean",
    price: 69999, old: 79999,
    img: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=85",
    badge: "VALUE KING",
    rating: 4.7, reviews: 4890,
    desc: "Snapdragon 8 Elite, Hasselblad-tuned triple cameras, 100W SuperVOOC charging that fills from 0–100% in just 36 minutes.",
    specs: [
      ["Display", "6.82\" LTPO AMOLED, 1–120Hz"],
      ["Chip", "Snapdragon 8 Elite"],
      ["Camera", "50MP Main + 50MP Periscope + 50MP Ultra Wide"],
      ["Battery", "6000 mAh"],
      ["Storage", "256GB"],
      ["OS", "OxygenOS 15"]
    ]
  },
  {
    id: 104, cat: "Phones",
    brand: "Google", name: "Pixel 9 Pro XL 256GB — Obsidian",
    price: 109999, old: 119999,
    img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=85",
    badge: "AI CAMERA",
    rating: 4.8, reviews: 3760,
    desc: "The purest Android experience. Google Tensor G4, best-in-class camera with Magic Eraser, 7 years of software updates guaranteed.",
    specs: [
      ["Display", "6.8\" LTPO OLED, 1–120Hz"],
      ["Chip", "Google Tensor G4"],
      ["Camera", "50MP Main + 48MP Ultra Wide + 48MP Tele"],
      ["Battery", "5060 mAh"],
      ["Storage", "256GB"],
      ["OS", "Android 15"]
    ]
  },
  {
    id: 105, cat: "Phones",
    brand: "Xiaomi", name: "Xiaomi 14 Ultra 512GB — White",
    price: 99999, old: 109999,
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=85",
    badge: "LEICA LENS",
    rating: 4.7, reviews: 2940,
    desc: "Leica-certified 1-inch camera sensor, Snapdragon 8 Gen 3, 90W wired + 80W wireless charging, and a titanium frame.",
    specs: [
      ["Display", "6.73\" LTPO AMOLED, 1–120Hz"],
      ["Chip", "Snapdragon 8 Gen 3"],
      ["Camera", "50MP 1-inch Leica Main + 50MP Ultra Wide + 50MP 5x"],
      ["Battery", "5000 mAh"],
      ["Storage", "512GB"],
      ["OS", "HyperOS 2 / Android 15"]
    ]
  },
  {
    id: 106, cat: "Phones",
    brand: "Realme", name: "Realme GT 7 Pro 256GB — Mars Orange",
    price: 49999, old: 57999,
    img: "https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=600&q=85",
    badge: "BEST VALUE",
    rating: 4.5, reviews: 5120,
    desc: "Snapdragon 8 Elite at an unbeatable price. Sony LYT-808 camera sensor, 120W FlashCharge, satellite connectivity.",
    specs: [
      ["Display", "6.78\" AMOLED, 120Hz"],
      ["Chip", "Snapdragon 8 Elite"],
      ["Camera", "50MP Sony LYT-808 + 50MP Ultra Wide"],
      ["Battery", "6500 mAh"],
      ["Storage", "256GB"],
      ["OS", "realme UI 6.0"]
    ]
  },
  {
    id: 107, cat: "Phones",
    brand: "Vivo", name: "Vivo X200 Pro 512GB — Titanium Grey",
    price: 94999, old: 104999,
    img: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=600&q=85",
    badge: "ZEISS OPTICS",
    rating: 4.7, reviews: 2280,
    desc: "Zeiss-certified 200MP camera with 6x optical zoom, Dimensity 9400 chip, 90W FlashCharge and 30W wireless charging.",
    specs: [
      ["Display", "6.78\" LTPO AMOLED, 144Hz"],
      ["Chip", "Dimensity 9400"],
      ["Camera", "200MP ZEISS Tele + 50MP Wide + 50MP Ultra Wide"],
      ["Battery", "6000 mAh"],
      ["Storage", "512GB"],
      ["OS", "FunTouchOS 15"]
    ]
  },
  {
    id: 108, cat: "Phones",
    brand: "OPPO", name: "OPPO Find X8 Pro 256GB — Space Black",
    price: 89999, old: 97999,
    img: "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=600&q=85",
    badge: "HASSELBLAD",
    rating: 4.6, reviews: 1840,
    desc: "Co-engineered with Hasselblad, Dimensity 9400, periscope camera with 6x optical zoom, and MariSilicon X2 imaging chip.",
    specs: [
      ["Display", "6.82\" LTPO OLED, 120Hz"],
      ["Chip", "Dimensity 9400"],
      ["Camera", "50MP Hasselblad Tele + 50MP Ultra Wide + 50MP Wide"],
      ["Battery", "5910 mAh"],
      ["Storage", "256GB"],
      ["OS", "ColorOS 15"]
    ]
  },
  {
    id: 109, cat: "Phones",
    brand: "Nothing", name: "Nothing Phone (3) 256GB — White",
    price: 54999, old: 64999,
    img: "https://images.unsplash.com/photo-1601972602237-8c79241e468b?auto=format&fit=crop&w=600&q=85",
    badge: "ICONIC DESIGN",
    rating: 4.5, reviews: 3310,
    desc: "Unique Glyph Interface, Snapdragon 8s Gen 4, transparent back design, and Essential Space AI assistant.",
    specs: [
      ["Display", "6.77\" LTPO AMOLED, 120Hz"],
      ["Chip", "Snapdragon 8s Gen 4"],
      ["Camera", "50MP Sony Main + 50MP Ultra Wide"],
      ["Battery", "5150 mAh"],
      ["Storage", "256GB"],
      ["OS", "Nothing OS 4.0"]
    ]
  },
  {
    id: 110, cat: "Phones",
    brand: "Samsung", name: "Galaxy Z Fold 6 512GB — Navy",
    price: 164999, old: 179999,
    img: "https://images.unsplash.com/photo-1575695342520-b27d8d8d7f3e?auto=format&fit=crop&w=600&q=85",
    badge: "FOLDABLE",
    rating: 4.7, reviews: 2050,
    desc: "The ultimate foldable phone. 7.6\" foldable display, Galaxy AI, Snapdragon 8 Gen 3 for Galaxy, and an S Pen ready cover.",
    specs: [
      ["Display", "7.6\" Foldable AMOLED + 6.3\" Cover"],
      ["Chip", "Snapdragon 8 Gen 3 for Galaxy"],
      ["Camera", "50MP Main + 12MP Ultra Wide + 10MP Tele"],
      ["Battery", "4400 mAh"],
      ["Storage", "512GB"],
      ["OS", "Android 15 / OneUI 7"]
    ]
  },
  {
    id: 111, cat: "Phones",
    brand: "Apple", name: "iPhone 16 128GB — Pink",
    price: 79900, old: 89900,
    img: "https://images.unsplash.com/photo-1587033411391-5d9e51cce126?auto=format&fit=crop&w=600&q=85",
    badge: "POPULAR",
    rating: 4.8, reviews: 9210,
    desc: "Powerful A16 Bionic chip, a new Camera Control button, Action Button, USB-C, and the beautiful pink finish.",
    specs: [
      ["Display", "6.1\" Super Retina XDR, 60Hz"],
      ["Chip", "A16 Bionic"],
      ["Camera", "48MP Main + 12MP Ultra Wide"],
      ["Battery", "3561 mAh"],
      ["Storage", "128GB"],
      ["OS", "iOS 18"]
    ]
  },
  {
    id: 112, cat: "Phones",
    brand: "Motorola", name: "Motorola Edge 50 Ultra 256GB — Peach Fuzz",
    price: 59999, old: 69999,
    img: "https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=600&q=85",
    badge: "PANDA GLASS",
    rating: 4.4, reviews: 1620,
    desc: "108MP triple camera, 125W TurboPower charging, military-grade durability, and 3 years of software updates guaranteed.",
    specs: [
      ["Display", "6.67\" pOLED, 144Hz"],
      ["Chip", "Snapdragon 8s Gen 3"],
      ["Camera", "50MP Main + 13MP Ultra Wide + 10MP Tele"],
      ["Battery", "4500 mAh"],
      ["Storage", "256GB"],
      ["OS", "Android 14"]
    ]
  },
  {
    id: 113, cat: "Phones",
    brand: "iQOO", name: "iQOO 13 256GB — Legend",
    price: 54999, old: 62999,
    img: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=85",
    badge: "GAMER",
    rating: 4.6, reviews: 4420,
    desc: "Snapdragon 8 Elite, 144Hz AMOLED display, 120W FlashCharge, Monster Touch shoulder triggers for gaming.",
    specs: [
      ["Display", "6.82\" AMOLED, 144Hz"],
      ["Chip", "Snapdragon 8 Elite"],
      ["Camera", "50MP Sony IMX921 + 50MP Ultra Wide + 64MP Tele"],
      ["Battery", "6100 mAh"],
      ["Storage", "256GB"],
      ["OS", "FunTouchOS 15"]
    ]
  }
];

const ACCESSORIES = [
  { id: 1, cat: "Chargers", brand: "Varun Express", name: "65W GaN Triple-Port Fast Charger", price: 1699, old: 2999, img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80", badge: "PREMIUM", rating: 4.8, reviews: 2140, desc: "Triple-port GaN charger (USB-C PD + USB-A x2). 65W total output. Charges a MacBook Air, iPhone, and AirPods simultaneously.", specs: [["Wattage", "65W Total"], ["Ports", "1x USB-C PD + 2x USB-A"], ["Technology", "GaN III"], ["Compatibility", "Universal"]] },
  { id: 2, cat: "Chargers", brand: "Varun Express", name: "20W USB-C GaN Compact Charger", price: 349, old: 599, img: "https://images.unsplash.com/photo-1622445262465-2481c4574875?auto=format&fit=crop&w=600&q=80", badge: "BEST SELLER", rating: 4.7, reviews: 5820, desc: "Ultra-compact foldable plug, 20W USB-C PD. Perfect for travel. Charges iPhone 16 to 50% in 30 minutes.", specs: [["Wattage", "20W"], ["Port", "USB-C PD"], ["Form", "Foldable Plug"], ["Size", "Pocket-sized"]] },
  { id: 3, cat: "Power Banks", brand: "Mi", name: "Mi 20000mAh Fast Charge Power Bank", price: 1899, old: 2499, img: "https://images.unsplash.com/photo-1706061327178-90407a82209d?auto=format&fit=crop&w=600&q=80", badge: "TOP RATED", rating: 4.6, reviews: 7610, desc: "20000mAh lithium-polymer cells, 33W fast charging output, dual USB-A + USB-C ports, LED indicator. Charges 4 phones fully.", specs: [["Capacity", "20000 mAh"], ["Output", "33W Max"], ["Ports", "2x USB-A + 1x USB-C"], ["Weight", "445g"]] },
  { id: 4, cat: "Power Banks", brand: "Ambrane", name: "10000mAh Ultra-Slim Power Bank", price: 999, old: 1499, img: "https://images.unsplash.com/photo-1609592424085-f56a5933663a?auto=format&fit=crop&w=600&q=80", badge: "HOT DEAL", rating: 4.5, reviews: 3940, desc: "Only 12mm thin, 10000mAh capacity, 22.5W fast charging. Airplane-safe. Charges most smartphones twice.", specs: [["Capacity", "10000 mAh"], ["Output", "22.5W"], ["Thickness", "12mm"], ["Weight", "210g"]] },
  { id: 5, cat: "Earphones", brand: "boAt", name: "Airdopes 141 True Wireless Earbuds", price: 1299, old: 2199, img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80", badge: "POPULAR", rating: 4.4, reviews: 12850, desc: "BEAST mode sound, 42H total playback, IPX4 water resistance, ENx noise-cancelling mics, and instant voice assistant access.", specs: [["Battery", "42H Total"], ["Driver", "8mm BEAST"], ["Water Resistance", "IPX4"], ["Connection", "Bluetooth 5.3"]] },
  { id: 6, cat: "Earphones", brand: "Sony", name: "Sony WH-1000XM5 Wireless Headphones", price: 22990, old: 29990, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80", badge: "AUDIOPHILE", rating: 4.9, reviews: 4280, desc: "Industry-leading ANC, 30H battery with fast charge (3 min = 3 hours), Hi-Res Audio certified, multipoint connectivity.", specs: [["ANC", "Industry Leading"], ["Battery", "30H + Fast Charge"], ["Driver", "30mm"], ["Codec", "LDAC, AAC, SBC"]] },
  { id: 7, cat: "Mobile Cases", brand: "Varun Express", name: "Rugged Armor Military Drop Protection Case", price: 449, old: 799, img: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80", badge: "MIL-GRADE", rating: 4.6, reviews: 3810, desc: "MIL-STD-810G rated, dual-layer armor, precise cutouts, raised bezel protection for screen and camera.", specs: [["Standard", "MIL-STD-810G"], ["Material", "TPU + Polycarbonate"], ["Drop Protection", "6ft"], ["Compatibility", "Universal"]] },
  { id: 8, cat: "Cables", brand: "Varun Express", name: "Braided USB-C to USB-C 100W Cable 2m", price: 399, old: 699, img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=600&q=80", badge: "DURABLE", rating: 4.7, reviews: 2460, desc: "Nylon braided, 100W PD, USB 3.1 Gen 2 data transfer at 10Gbps, 4K@60Hz display output, rated for 30,000+ bends.", specs: [["Power", "100W PD"], ["Data", "10Gbps"], ["Length", "2 Meters"], ["Bends Tested", "30,000+"]] },
  { id: 9, cat: "Screen Guards", brand: "Varun Express", name: "9H Tempered Glass Privacy Screen Guard", price: 149, old: 299, img: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=600&q=80", badge: "ANTI-SPY", rating: 4.5, reviews: 6120, desc: "Privacy filter blocks side views beyond 30°, 9H hardness, oleophobic coating, bubble-free installation.", specs: [["Hardness", "9H"], ["Privacy Angle", "30°"], ["Coating", "Oleophobic"], ["Thickness", "0.33mm"]] },
  { id: 10, cat: "Accessories", brand: "Varun Express", name: "Magnetic Wireless Car Mount with Fast Charge", price: 1299, old: 2199, img: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=85", badge: "LUXURY GEAR", rating: 4.6, reviews: 1890, desc: "15W MagSafe-compatible wireless charging, 360° rotation, one-handed mount/release, fits all AC vents.", specs: [["Charging", "15W Wireless"], ["Rotation", "360°"], ["Compatibility", "MagSafe + Universal"], ["Mount", "AC Vent"]] },
];

const ALL_PRODUCTS = [...PHONES, ...ACCESSORIES];

const OFFERS = [
  { id: 1, festTag: "fest-diwali", festLabel: "🪔 Diwali Sale", emoji: "🪔", color: "#ffd700", title: "Diwali Mega Bonanza", desc: "Celebrate Diwali with massive discounts on all smartphones and premium accessories. Light up your Diwali with the best tech deals!", discount: "30% OFF", code: "DIWALI30", validity: "Valid: 1 Nov – 5 Nov 2025", onOrder: "Applicable on orders above ₹5,000" },
  { id: 2, festTag: "fest-republic", festLabel: "🇮🇳 Republic Day", emoji: "🇮🇳", color: "#ff7043", title: "Republic Day Mega Sale", desc: "Honor the Republic with freedom to save! Huge discounts across all categories including flagship phones and accessories.", discount: "26% OFF", code: "REPUBLIC26", validity: "Valid: 24 Jan – 27 Jan 2026", onOrder: "No minimum order required" },
  { id: 3, festTag: "fest-holi", festLabel: "🎨 Holi Festival", emoji: "🎨", color: "#f06292", title: "Holi Color Splash Deals", desc: "Add color to your tech life this Holi! Special combo offers on earphones and cases. Buy 2 get 1 free!", discount: "40% OFF", code: "HOLI40", validity: "Valid: 13 Mar – 15 Mar 2026", onOrder: "On selected combos only" },
  { id: 4, festTag: "fest-eid", festLabel: "🌙 Eid Special", emoji: "🌙", color: "#69f0ae", title: "Eid Mubarak Festival Offers", desc: "Celebrate Eid with the gift of technology. Special discounts on Apple, Samsung, and OnePlus flagship smartphones.", discount: "20% OFF", code: "EID20", validity: "Valid during Eid week", onOrder: "On smartphones above ₹50,000" },
  { id: 5, festTag: "fest-christmas", festLabel: "🎄 Christmas Sale", emoji: "🎄", color: "#ff8a80", title: "Christmas Tech Gifting", desc: "The perfect Christmas gift is a great gadget! Flat 25% off on all audio products, chargers, and gift combos.", discount: "25% OFF", code: "XMAS25", validity: "Valid: 23 Dec – 27 Dec 2025", onOrder: "Min order ₹999" },
  { id: 6, festTag: "fest-independence", festLabel: "🇮🇳 Independence Day", emoji: "🇮🇳", color: "#ffca28", title: "Azaadi ka Mahotsav", desc: "Freedom to choose, freedom to save! 15% off storewide on Independence Day. Celebrate with premium tech.", discount: "15% OFF", code: "AZAADI15", validity: "Valid: 14 Aug – 16 Aug 2025", onOrder: "On all orders" },
  { id: 7, festTag: "fest-flash", festLabel: "⚡ Flash Sale", emoji: "⚡", color: "#00c3ff", title: "48-Hour Flash Deals", desc: "Limited stock! Best-selling GaN chargers and TWS earbuds at rock-bottom prices. Grab before it's gone!", discount: "50% OFF", code: "FLASH50", validity: "48 Hours only · Limited stock", onOrder: "First 100 orders guaranteed" },
  { id: 8, festTag: "fest-diwali", festLabel: "📱 Brand Week", emoji: "📱", color: "#ce93d8", title: "Samsung Brand Week", desc: "Exclusive Samsung festival — Galaxy S25 Ultra, Z Fold 6, Galaxy Buds all at never-before prices!", discount: "₹10,000 OFF", code: "SAMSUNG10K", validity: "Valid for 7 days", onOrder: "On Samsung smartphones above ₹80,000" },
];

const CATS = ["All", "Phones", "Chargers", "Cables", "Power Banks", "Earphones", "Mobile Cases", "Screen Guards", "Accessories"];

const BRANDS_TICKER = ["Apple", "Samsung", "OnePlus", "Google Pixel", "Xiaomi", "Realme", "Vivo", "OPPO", "Nothing", "boAt", "Motorola", "iQOO", "Sony", "JBL"];

/* ═══════════════════ COMPONENTS ═══════════════════ */

function Navbar({ page, setPage, cartCount, onCartOpen }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = ["Home", "Store", "Offers", "About Us", "Contact"];
  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="logo" onClick={() => setPage("Home")}>
        <svg className="logo-icon" viewBox="0 0 40 40" fill="none">
          <path d="M8 32L20 8L32 32" stroke="#1a8fff" strokeWidth="3" strokeLinejoin="round"/>
          <path d="M12 24H28" stroke="#00c3ff" strokeWidth="2.5"/>
          <circle cx="20" cy="6" r="3" fill="#00c3ff"/>
        </svg>
        <span className="logo-text">VARUN<span> EXPRESS</span></span>
      </div>
      <div className="nav-links">
        {links.map(l => (
          <span key={l} className={`nav-link${page === l ? " active" : ""}`} onClick={() => setPage(l)}>{l}</span>
        ))}
      </div>
      <button className="cart-btn" onClick={onCartOpen}>
        🛒 Cart {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
      </button>
    </nav>
  );
}

function BrandsTicker() {
  const doubled = [...BRANDS_TICKER, ...BRANDS_TICKER];
  return (
    <div className="brands-ticker">
      <div className="ticker-inner">
        {doubled.map((b, i) => (
          <span key={i} className="ticker-brand">
            {b} <span className="ticker-sep">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function HomePage({ setPage, setFilter }) {
  const cats = [
    { icon: "📱", label: "Phones" }, { icon: "🔌", label: "Chargers" }, { icon: "🪢", label: "Cables" },
    { icon: "🔋", label: "Power Banks" }, { icon: "🎧", label: "Earphones" },
    { icon: "📱", label: "Mobile Cases" }, { icon: "🛡️", label: "Screen Guards" }, { icon: "⚙️", label: "Accessories" }
  ];
  const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${50 + Math.random() * 50}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${4 + Math.random() * 5}s`,
    size: `${3 + Math.random() * 4}px`
  }));

  return (
    <div className="page-enter">
      <section className="hero">
        {PARTICLES.map(p => (
          <div key={p.id} className="particle" style={{ left: p.left, top: p.top, width: p.size, height: p.size, animationDelay: p.delay, animationDuration: p.duration }} />
        ))}
        <div className="hero-content">
          <p className="hero-eyebrow">
            <span className="eyebrow-line" />
            India's No.1 Mobile Accessories Hub
          </p>
          <h1 className="hero-title">
            POWER UP.
            <span className="accent">STAY AHEAD.</span>
          </h1>
          <p className="hero-sub">
            Flagship smartphones from Apple, Samsung, OnePlus & more — plus premium accessories engineered for peak performance.
          </p>
          <div className="hero-badges">
            {["🛡️ Genuine Products", "⚡ Fast Delivery", "🔒 Secure Payment", "📦 Easy Returns"].map(b => (
              <div key={b} className="h-badge">{b}</div>
            ))}
          </div>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => setPage("Store")}>Shop Now →</button>
            <button className="btn-outline" onClick={() => setPage("Offers")}>View Offers</button>
          </div>
          <div className="hero-cats">
            <p className="hero-cats-label">Browse by Category</p>
            <div className="cats-row">
              {cats.map(c => (
                <div key={c.label} className="cat-pill" onClick={() => { setFilter(c.label); setPage("Store"); }}>
                  <span>{c.icon}</span> {c.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <BrandsTicker />
      <div className="footer">
        <span>🛒</span> Everything Your Mobile Needs. One Place. <em>Varun Express.</em>
      </div>
    </div>
  );
}

function ProductModal({ product, onClose, onAddToCart, onBuyNow }) {
  const save = Math.round(((product.old - product.price) / product.old) * 100);
  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-inner">
          <div className="modal-img-side">
            <img src={product.img} alt={product.name} className="modal-img" onError={e => { e.target.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80"; }} />
            <span className="modal-img-badge">{product.badge}</span>
          </div>
          <div className="modal-info-side">
            <div className="modal-brand">{product.brand}</div>
            <div className="modal-name">{product.name}</div>
            <div className="modal-price-row">
              <span className="modal-price">₹{product.price.toLocaleString("en-IN")}</span>
              <span className="modal-old">₹{product.old.toLocaleString("en-IN")}</span>
            </div>
            <div className="modal-save">You save ₹{(product.old - product.price).toLocaleString("en-IN")} ({save}% OFF)</div>
            {product.rating && (
              <div className="modal-rating" style={{ marginTop: 10 }}>
                <span className="stars">{"★".repeat(Math.round(product.rating))}</span>
                <span>{product.rating} · {product.reviews?.toLocaleString("en-IN")} reviews</span>
              </div>
            )}
            <p className="modal-desc">{product.desc}</p>
            {product.specs && (
              <div className="modal-specs">
                <div className="specs-title">Key Specifications</div>
                {product.specs.map(([k, v]) => (
                  <div key={k} className="spec-row">
                    <span className="spec-key">{k}</span>
                    <span className="spec-val">{v}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="modal-actions">
              <button className="btn-buy" onClick={() => onBuyNow(product)}>
                ⚡ Buy Now
              </button>
              <button className="btn-cart" onClick={() => { onAddToCart(product); onClose(); }}>
                🛒 Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentModal({ product, onClose, onAddToCart }) {
  const [step, setStep] = useState("choose"); // "choose" | "success"
  const [method, setMethod] = useState(null);  // "cod" | "online"
  const [upi, setUpi] = useState("");

  const canConfirm = method === "cod" || (method === "online" && upi.trim().length > 0);

  const confirm = () => {
    onAddToCart(product);
    setStep("success");
  };

  return (
    <div className="payment-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="payment-box">
        <button className="payment-close" onClick={onClose}>×</button>

        {step === "choose" ? (
          <>
            <div className="payment-title">Complete Purchase</div>
            <div className="payment-product">{product.name}</div>
            <div className="payment-amount">₹{product.price.toLocaleString("en-IN")}</div>

            <div className="payment-divider">Choose Payment Method</div>

            <div
              className={`payment-option${method === "cod" ? " selected" : ""}`}
              onClick={() => setMethod("cod")}
            >
              <span className="po-icon">💵</span>
              <div className="po-info">
                <div className="po-label">Cash on Delivery</div>
                <div className="po-desc">Pay when your order arrives at your door</div>
              </div>
              <div className="po-check">{method === "cod" ? "✓" : ""}</div>
            </div>

            <div
              className={`payment-option${method === "online" ? " selected" : ""}`}
              onClick={() => setMethod("online")}
            >
              <span className="po-icon">📲</span>
              <div className="po-info">
                <div className="po-label">Online Transaction</div>
                <div className="po-desc">UPI, Net Banking, Cards — instant confirmation</div>
              </div>
              <div className="po-check">{method === "online" ? "✓" : ""}</div>
            </div>

            {method === "online" && (
              <div className="payment-upi-field">
                <input
                  type="text"
                  placeholder="Enter UPI ID (e.g. name@upi) or card / ref number"
                  value={upi}
                  onChange={e => setUpi(e.target.value)}
                  autoFocus
                />
              </div>
            )}

            <button
              className="payment-confirm-btn"
              disabled={!canConfirm}
              onClick={confirm}
            >
              {method === "cod"
                ? "✅ Confirm Order (Cash on Delivery)"
                : method === "online"
                  ? "💳 Confirm & Pay Online"
                  : "Select a payment method to continue"}
            </button>
          </>
        ) : (
          <div className="payment-success">
            <span className="payment-success-icon">🎉</span>
            <h3>Order Placed!</h3>
            <p>
              {method === "cod"
                ? "Your order has been confirmed. Our team will contact you shortly to schedule delivery."
                : "Payment received! Your order is confirmed and will be dispatched within 24 hours."}
            </p>
            <p style={{ color: "var(--blue-bright)", marginTop: 12, fontWeight: 600 }}>
              {product.name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function StorePage({ onAddToCart, activeFilter, setActiveFilter }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [payProduct, setPayProduct] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12);

  const filtered = ALL_PRODUCTS.filter(p => {
    const matchCat = activeFilter === "All" || p.cat === activeFilter;
    const q = search.toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });
  const visible = filtered.slice(0, visibleCount);

  return (
    <div className="page page-enter">
      <div className="page-header">
        <p className="section-label">Browse Premium Gear</p>
        <h1 className="page-title">Our <span>Store</span></h1>
        <p className="page-sub">Flagship phones from top brands + premium accessories — all genuine, all warranted.</p>
      </div>

      <div className="store-controls">
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input
            type="text" className="search-input" value={search}
            onChange={e => { setSearch(e.target.value); setVisibleCount(12); }}
            placeholder="Search phones, brands, accessories…"
          />
          {search && <button className="search-clear" onClick={() => setSearch("")}>×</button>}
        </div>
      </div>

      <div className="filter-row">
        {CATS.map(c => (
          <button key={c} className={`filter-btn${activeFilter === c ? " active" : ""}`}
            onClick={() => { setActiveFilter(c); setVisibleCount(12); }}>
            {c}
          </button>
        ))}
      </div>

      <p className="results-count">
        Showing <strong>{Math.min(visibleCount, filtered.length)}</strong> of <strong>{filtered.length}</strong> products
        {search && <> for "<strong>{search}</strong>"</>}
      </p>

      {visible.length === 0 ? (
        <div className="no-results">
          <span className="nr-icon">🔍</span>
          <h3>No products found</h3>
          <p>Try a different search or category</p>
        </div>
      ) : (
        <div className="store-grid">
          {visible.map((p, i) => {
            const save = Math.round(((p.old - p.price) / p.old) * 100);
            return (
              <div
                key={p.id}
                className="store-card"
                style={{ animationDelay: `${(i % 12) * 0.05}s` }}
                onClick={() => setSelected(p)}
              >
                <div className="card-img-wrap">
                  <img src={p.img} alt={p.name} className="card-img" loading="lazy"
                    onError={e => { e.target.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80"; }} />
                  <div className="card-img-overlay" />
                  <span className={`s-badge${p.badge === "NEW" ? " new" : p.badge?.includes("DEAL") || p.badge === "VALUE KING" ? " sale" : ""}`}>{p.badge}</span>
                </div>
                <div className="card-body">
                  <div className="s-brand">{p.brand}</div>
                  <div className="s-name">{p.name}</div>
                  <div className="price-row">
                    <span className="s-price">₹{p.price.toLocaleString("en-IN")}</span>
                    <span className="s-old">₹{p.old.toLocaleString("en-IN")}</span>
                    <span className="s-save">{save}% off</span>
                  </div>
                  <div className="card-actions">
                    <button className="add-btn" onClick={e => { e.stopPropagation(); onAddToCart(p); }}>+ Cart</button>
                    <button className="view-btn" style={{ background: "linear-gradient(135deg,#00c3ff 0%,#1a8fff 100%)", color: "#fff", border: "none" }}
                      onClick={e => { e.stopPropagation(); setPayProduct(p); }}>
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {visibleCount < filtered.length && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 48 }}>
          <button className="btn-outline" onClick={() => setVisibleCount(v => v + 12)}>
            Load More Products ({filtered.length - visibleCount} remaining)
          </button>
        </div>
      )}

      {selected && (
        <ProductModal
          product={selected}
          onClose={() => setSelected(null)}
          onAddToCart={onAddToCart}
          onBuyNow={p => { setSelected(null); setPayProduct(p); }}
        />
      )}

      {payProduct && (
        <PaymentModal
          product={payProduct}
          onClose={() => setPayProduct(null)}
          onAddToCart={onAddToCart}
        />
      )}
    </div>
  );
}

function OffersPage() {
  const [copied, setCopied] = useState(null);
  const copy = (code, id) => {
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="page page-enter">
      <div className="page-header">
        <p className="section-label">Deals & Discounts</p>
        <h1 className="page-title">Festival <span>Offers</span></h1>
        <p className="page-sub">Exclusive deals for every festival of the year. Grab the best discounts before they expire!</p>
      </div>

      <div className="offers-hero">
        <p className="section-label">🎉 Year-Round Savings</p>
        <h2 style={{ fontFamily: "Rajdhani", fontSize: 36, fontWeight: 700, color: "#fff", marginBottom: 12 }}>
          Save Big on Every Festival
        </h2>
        <p style={{ color: "var(--muted)", fontSize: 15, maxWidth: 600, lineHeight: 1.7 }}>
          From Diwali to Christmas, Republic Day to Holi — Varun Express celebrates every festival with massive discounts on flagship phones and premium accessories.
        </p>
      </div>

      <div className="offers-grid">
        {OFFERS.map((o, i) => (
          <div key={o.id} className="offer-card" style={{ animationDelay: `${i * 0.07}s` }}>
            <span className={`festival-tag ${o.festTag}`}>{o.festLabel}</span>
            <div className="oc-discount" style={{ color: o.color }}>{o.discount}</div>
            <div className="oc-title">{o.emoji} {o.title}</div>
            <div className="oc-desc">{o.desc}</div>
            <div className="oc-validity">📅 {o.validity}</div>
            <div className="oc-validity" style={{ marginBottom: 16 }}>🛒 {o.onOrder}</div>
            <div className="code-box">
              <div>
                <div className="code-label">Promo Code</div>
                <div className="code-val">{o.code}</div>
              </div>
              <button className={`copy-btn${copied === o.id ? " copied" : ""}`} onClick={() => copy(o.code, o.id)}>
                {copied === o.id ? "✓ Copied!" : "Copy"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutPage({ setPage }) {
  const values = [
    { icon: "🏆", title: "100% Genuine Products", desc: "Every product on our shelf is verified authentic, sourced directly from brand partners." },
    { icon: "⚡", title: "Fast Nationwide Delivery", desc: "Guaranteed delivery within 2–5 business days across all 28 states in India." },
    { icon: "🔒", title: "Secure Shopping", desc: "Bank-grade SSL encryption, multiple payment options, and complete buyer protection." },
    { icon: "🤝", title: "After-Sales Support", desc: "Dedicated support team available 6 days a week for warranty claims and replacements." },
    { icon: "💰", title: "Best Price Guarantee", desc: "Found it cheaper? We'll match the price. No questions asked." },
    { icon: "♻️", title: "7-Day Easy Returns", desc: "Not happy? Return within 7 days for a full refund or exchange, hassle-free." },
  ];

  const partnerBrands = ["Apple", "Samsung", "OnePlus", "Google", "Xiaomi", "Realme", "Vivo", "OPPO", "Nothing", "boAt", "Sony", "JBL", "Portronics", "Ambrane", "Mi"];

  return (
    <div className="page page-enter">
      <div className="page-header">
        <p className="section-label">Our Story</p>
        <h1 className="page-title">About <span>Us</span></h1>
      </div>

      <div className="about-hero">
        <div className="about-hero-bg" />
        <div className="about-hero-content">
          <h2 className="about-hero-title">
            Built on <span>Trust</span> &<br />Premium Quality
          </h2>
          <p className="about-hero-text">
            Varun Express started as a single store on S.G. Highway, Ahmedabad with one mission: give every Indian smartphone user access to genuine premium accessories they can trust. Today, we're India's fastest-growing mobile tech destination.
          </p>
          <button className="btn-primary" onClick={() => setPage("Store")}>Shop Premium Collection →</button>
        </div>
        <div className="about-floating-card">
          <span className="afc-icon">⚡</span>
          <div className="afc-tagline">"Powering India,<br />One Device at a Time."</div>
        </div>
      </div>

      <div className="stats-row">
        {[
          ["50,000+", "Happy Customers"],
          ["500+", "Products"],
          ["7+", "Years Experience"],
          ["100%", "Genuine Products"]
        ].map(([n, l], i) => (
          <div key={l} className="stat-card" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="stat-num">{n}</div>
            <div className="stat-label">{l}</div>
          </div>
        ))}
      </div>

      <div className="about-story">
        <div className="about-story-img-wrap">
          <img
            src="https://images.unsplash.com/photo-1556742031-c6961e8560b0?auto=format&fit=crop&w=800&q=85"
            alt="Store" className="about-story-img"
          />
        </div>
        <div className="about-story-text">
          <h2>From a Single <span style={{ color: "var(--blue-bright)" }}>Shop to a Brand</span></h2>
          <p>
            Founded in 2018, Varun Express started in a small retail shop with just 50 products. The goal was simple: offer genuine accessories at fair prices with honest advice.
          </p>
          <p>
            By cutting out middlemen and working directly with brands like boAt, Ambrane, Portronics, and now Apple and Samsung authorized dealers, we've built a supply chain that delivers authentic products at prices that beat the market.
          </p>
          <p>
            Today we stock over 500 products across 8 categories, ship pan-India, and serve 50,000+ happy customers who trust us for their mobile accessory needs — from a ₹99 cable to a ₹1.65 lakh Samsung Galaxy Z Fold 6.
          </p>
          <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
            <button className="btn-primary" onClick={() => setPage("Store")}>Shop Now →</button>
            <button className="btn-outline" onClick={() => setPage("Contact")}>Contact Us</button>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <p className="section-label">Why Choose Us</p>
        <h2 style={{ fontFamily: "Rajdhani", fontSize: 36, fontWeight: 700, marginBottom: 28 }}>
          The Varun Express <span style={{ color: "var(--blue-bright)" }}>Promise</span>
        </h2>
      </div>
      <div className="values-grid">
        {values.map((v, i) => (
          <div key={v.title} className="value-card" style={{ animationDelay: `${i * 0.08}s` }}>
            <span className="v-icon">{v.icon}</span>
            <div className="v-title">{v.title}</div>
            <div className="v-desc">{v.desc}</div>
          </div>
        ))}
      </div>

      <div className="brands-showcase">
        <h2>Our <span style={{ color: "var(--blue-bright)" }}>Brand Partners</span></h2>
        <div className="brands-logos">
          {partnerBrands.map(b => (
            <div key={b} className="brand-logo-card">{b}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", topic: "", msg: "" });
  const [sent, setSent] = useState(false);
  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = () => {
    if (!form.name || !form.email || !form.msg) {
      alert("Please fill Name, Email, and Message.");
      return;
    }
    const targetNumber = "+919876543210";
    const body = `Inquiry - Varun Express\nName: ${form.name}\nPhone: ${form.phone || "N/A"}\nEmail: ${form.email}\nTopic: ${form.topic || "General"}\nMessage: ${form.msg}`;
    window.location.href = `sms:${targetNumber}?body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div className="page page-enter">
      <div className="page-header">
        <p className="section-label">Get In Touch</p>
        <h1 className="page-title">Contact <span>Us</span></h1>
        <p className="page-sub">Questions, orders, bulk inquiries — our team is ready to help you every step of the way.</p>
      </div>

      <div className="contact-hero">
        <h2 style={{ fontFamily: "Rajdhani", fontSize: 36, fontWeight: 700, color: "#fff", marginBottom: 10 }}>
          We're Here <span style={{ color: "var(--blue-bright)" }}>For You</span>
        </h2>
        <p style={{ color: "var(--muted)", fontSize: 15 }}>
          Response time: Within 2 hours during business hours (Mon–Sat, 9 AM – 8 PM)
        </p>
      </div>

      <div className="contact-grid">
        <div className="contact-info-col">
          {[
            ["📍", "Our Store", "Shop No. 12, Varun Complex\nS.G. Highway, Ahmedabad\nGujarat — 380054"],
            ["📞", "Call / SMS", "+91 98765 43210\nMon–Sat, 9 AM – 8 PM"],
            ["📧", "Email", "support@varunexpress.in"],
            ["🕒", "Business Hours", "Monday to Saturday\n9:00 AM – 8:00 PM IST"],
          ].map(([icon, title, val]) => (
            <div key={title} className="contact-card">
              <span className="cc-icon">{icon}</span>
              <div>
                <div className="cc-title">{title}</div>
                <div className="cc-val" style={{ whiteSpace: "pre-line" }}>{val}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="contact-form-card">
          <div className="cf-title">Send Us a Message</div>
          {sent ? (
            <div style={{ textAlign: "center", padding: "40px 0", color: "var(--blue-bright)" }}>
              <div style={{ fontSize: 60, marginBottom: 16 }}>✓</div>
              <h3 style={{ color: "#fff", marginBottom: 8 }}>Message Sent!</h3>
              <p style={{ color: "var(--muted)" }}>We'll get back to you within 2 hours.</p>
            </div>
          ) : (
            <>
              <div className="form-row">
                <div className="field">
                  <label>Your Name *</label>
                  <input name="name" placeholder="Full name" value={form.name} onChange={handle} />
                </div>
                <div className="field">
                  <label>Phone Number</label>
                  <input name="phone" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handle} />
                </div>
              </div>
              <div className="field">
                <label>Email Address *</label>
                <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handle} />
              </div>
              <div className="field">
                <label>Inquiry Topic</label>
                <select name="topic" value={form.topic} onChange={handle}>
                  <option value="">Select a topic</option>
                  <option>Order Inquiry</option>
                  <option>Product Question</option>
                  <option>Return / Refund</option>
                  <option>Bulk Orders</option>
                  <option>Warranty Claim</option>
                </select>
              </div>
              <div className="field">
                <label>Message *</label>
                <textarea name="msg" placeholder="How can we help you today?" value={form.msg} onChange={handle} />
              </div>
              <button className="submit-btn" onClick={submit}>📲 Send Message via SMS</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function CartPanel({ cart, onClose, updateQty, onCheckout }) {
  const total = cart.reduce((a, c) => a + c.price * c.qty, 0);
  const count = cart.reduce((a, c) => a + c.qty, 0);

  return (
    <>
      <div className="cart-overlay" onClick={onClose} />
      <div className="cart-panel">
        <div className="cart-top">
          <div className="cart-header-row">
            <div className="cart-title">Your Cart</div>
            <button className="close-cart" onClick={onClose}>×</button>
          </div>
          <div className="cart-count-label">{count} item{count !== 1 ? "s" : ""}</div>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <span className="cart-empty-icon">🛒</span>
              <p>Your cart is empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.img} alt={item.name} className="ci-img"
                  onError={e => { e.target.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&q=80"; }} />
                <div className="ci-info">
                  <div className="ci-name">{item.name}</div>
                  <div className="ci-price">₹{(item.price * item.qty).toLocaleString("en-IN")}</div>
                  <div className="qty-row">
                    <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                    <span className="qty-num">{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                  </div>
                </div>
                <button className="ci-del" onClick={() => updateQty(item.id, -item.qty)}>🗑</button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-foot">
            <div className="cart-total">
              <span className="ct-label">Total</span>
              <span className="ct-val">₹{total.toLocaleString("en-IN")}</span>
            </div>
            <button className="checkout-btn" onClick={onCheckout}>
              Checkout via SMS 🚀
            </button>
          </div>
        )}
      </div>
    </>
  );
}

/* ═══════════════════ APP ROOT ═══════════════════ */
export default function App() {
  const [page, setPage] = useState("Home");
  const [filter, setFilter] = useState("All");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = useCallback((product) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    // Show a brief cart badge bump but don't force-open the panel
  }, []);

  const updateQty = useCallback((id, delta) => {
    setCart(prev => prev.map(i => {
      if (i.id !== id) return i;
      const q = i.qty + delta;
      return q > 0 ? { ...i, qty: q } : null;
    }).filter(Boolean));
  }, []);

  const checkout = () => {
    if (!cart.length) return;
    const body = `Order - Varun Express\n` + cart.map(i => `- ${i.name} (x${i.qty}): ₹${(i.price * i.qty).toLocaleString("en-IN")}`).join("\n") + `\nTotal: ₹${cart.reduce((a, c) => a + c.price * c.qty, 0).toLocaleString("en-IN")}`;
    window.location.href = `sms:+919876543210?body=${encodeURIComponent(body)}`;
  };

  const cartCount = cart.reduce((a, c) => a + c.qty, 0);

  const navigate = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pageMap = {
    "Home":     <HomePage setPage={navigate} setFilter={setFilter} />,
    "Store":    <StorePage onAddToCart={addToCart} activeFilter={filter} setActiveFilter={setFilter} />,
    "Offers":   <OffersPage />,
    "About Us": <AboutPage setPage={navigate} />,
    "Contact":  <ContactPage />,
  };

  return (
    <>
      <style>{styles}</style>
      <Navbar page={page} setPage={navigate} cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <main key={page}>{pageMap[page]}</main>
      {page !== "Home" && (
        <div className="footer">
          <span>🛒</span> Everything Your Mobile Needs. One Place. <em>Varun Express.</em>
        </div>
      )}
      {cartOpen && (
        <CartPanel
          cart={cart}
          onClose={() => setCartOpen(false)}
          updateQty={updateQty}
          onCheckout={checkout}
        />
      )}
    </>
  );
}