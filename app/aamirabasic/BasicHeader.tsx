"use client";

import {
  ChevronDown,
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useCart } from "./CartProvider";
import { products, formatAUD } from "./catalog";
import styles from "./BasicHeader.module.css";
import { useModalFocus } from "./useModalFocus";

const dropdownNavigation = [
  {
    label: "Shop",
    items: [
      { label: "View All", href: "/basic/shop" },
      { label: "Long Jackets", href: "/basic/shop/long-jackets" },
      { label: "Dresses & Kaftans", href: "/basic/shop/dresses-kaftans" },
      { label: "Tops & Shirts", href: "/basic/shop/tops-shirts" },
    ],
  },
  {
    label: "Collections",
    items: [
      { label: "Summer 2026", href: "/basic/collections/summer-2026" },
      { label: "Mother Daughter", href: "/basic/collections/mother-daughter" },
      { label: "The Signature Edit", href: "/basic/collections/signature-edit" },
      { label: "New Arrivals", href: "/basic/collections/new-arrivals" },
    ],
  },
] as const;

const navigation = [
  { label: "New In", href: "/basic/new-in" },
  { label: "Looks", href: "/basic/looks" },
  { label: "About", href: "/basic/about" },
] as const;

export default function BasicHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchPanelRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const cart = useCart();
  const results = query.trim() ? products.filter((product) => {
    const searchable = [product.name, product.category, product.material, ...product.tags].join(" ").toLowerCase();
    return searchable.includes(query.toLowerCase());
  }).slice(0, 5) : products.slice(0, 4);

  const closeSearch = useCallback(() => setSearchOpen(false), []);
  useModalFocus(searchOpen, searchPanelRef, closeSearch, searchInputRef);

  useEffect(() => {
    const closeNavigationOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      setOpenDropdown(null);
    };
    window.addEventListener("keydown", closeNavigationOnEscape);
    return () => window.removeEventListener("keydown", closeNavigationOnEscape);
  }, []);

  return (
    <header className={styles.header} onMouseLeave={() => setOpenDropdown(null)}>
      <Link href="/basic" className={styles.logo} aria-label="Aamira Basic home">
        <Image
          src="/image/aamira-basic-logo.png"
          alt="Aamira Basic"
          width={647}
          height={460}
          className={styles.mark}
          priority
        />
      </Link>

      <nav
        id="basic-navigation"
        className={`${styles.navigation} ${menuOpen ? styles.navigationOpen : ""}`}
        aria-label="Aamira Basic navigation"
      >
        {dropdownNavigation.map((menu) => (
          <div className={styles.navMenu} key={menu.label}>
            <button
              type="button"
              className={styles.navLink}
              aria-expanded={openDropdown === menu.label}
              aria-controls={`basic-${menu.label.toLowerCase()}-menu`}
              onMouseEnter={() => setOpenDropdown(menu.label)}
              onFocus={() => setOpenDropdown(menu.label)}
              onClick={() =>
                setOpenDropdown((current) => current === menu.label ? null : menu.label)
              }
            >
              {menu.label}
              <ChevronDown className={styles.chevron} strokeWidth={1.25} aria-hidden="true" />
            </button>

            <div
              id={`basic-${menu.label.toLowerCase()}-menu`}
              className={`${styles.dropdown} ${openDropdown === menu.label ? styles.dropdownOpen : ""}`}
              aria-hidden={openDropdown !== menu.label}
            >
              {menu.items.map((item) => (
                <Link
                  href={item.href}
                  className={styles.dropdownLink}
                  key={item.label}
                  onClick={() => {
                    setMenuOpen(false);
                    setOpenDropdown(null);
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}

        {navigation.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={styles.navLink}
            onMouseEnter={() => setOpenDropdown(null)}
            onFocus={() => setOpenDropdown(null)}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className={styles.actions}>
        <button type="button" className={styles.iconButton} aria-label="Search" onClick={() => setSearchOpen(true)}>
          <Search strokeWidth={1.45} aria-hidden="true" />
        </button>
        <Link href="/basic/account" className={styles.iconButton} aria-label="Account">
          <UserRound strokeWidth={1.35} aria-hidden="true" />
        </Link>
        <button type="button" className={styles.iconButton} aria-label={`Shopping bag, ${cart.count} items`} onClick={() => cart.setOpen(true)}>
          <ShoppingBag strokeWidth={1.35} aria-hidden="true" />
          {cart.count > 0 && <span className={styles.cartCount}>{cart.count}</span>}
        </button>
        <button
          type="button"
          className={`${styles.iconButton} ${styles.menuButton}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-controls="basic-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X strokeWidth={1.35} aria-hidden="true" /> : <Menu strokeWidth={1.35} aria-hidden="true" />}
        </button>
      </div>
      <div ref={searchPanelRef} className={`${styles.searchPanel} ${searchOpen ? styles.searchPanelOpen : ""}`} aria-hidden={!searchOpen} aria-modal="true" role="dialog" aria-labelledby="basic-search-label" inert={!searchOpen ? true : undefined}>
        <div className={styles.searchTop}><label id="basic-search-label" htmlFor="basic-search">Search Aamira Basic</label><button type="button" onClick={closeSearch} aria-label="Close search"><X /></button></div>
        <input ref={searchInputRef} id="basic-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by piece, category, or material..." />
        <p className={styles.searchLabel}>{query ? `${results.length} results` : "Popular pieces"}</p>
        <div className={styles.searchResults}>{results.map((product) => <Link href={`/basic/products/${product.slug}`} onClick={() => {setSearchOpen(false);setQuery("");}} key={product.id}><Image src={product.images[0]} alt="" width={72} height={96} /><span>{product.name}<small>{formatAUD(product.price)}</small></span></Link>)}</div>
        {query && !results.length && <p className={styles.noResults}>No pieces found. Try another search.</p>}
      </div>
    </header>
  );
}
