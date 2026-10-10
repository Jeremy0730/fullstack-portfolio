'use client'

import { FormEvent, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const nav = [
  { href: '#product', label: 'Product' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
]

const features = [
  {
    title: 'Morning board',
    text: 'GMV, orders, and late deliveries for every store, updated before the regional manager opens Slack.',
  },
  {
    title: 'Roles that match the floor',
    text: 'Owners see finance. Store leads see their own orders. Support sees the exception queue and nothing else.',
  },
  {
    title: 'Exception queue',
    text: 'Timeouts, failed payments, and low stock land in one list instead of four group chats.',
  },
  {
    title: 'Store leaderboard',
    text: 'Compare locations on the same products, so a slow store is obvious without a spreadsheet.',
  },
  {
    title: 'Exports finance will accept',
    text: 'CSV for the close. No surprise columns, no screenshot of a dashboard.',
  },
  {
    title: 'A screen for the office wall',
    text: 'The same numbers can drive a 1080p command display without rebuilding the data model.',
  },
]

const steps = [
  { n: '01', title: 'Connect the stores', text: 'Import locations and the channels you already sell on: counter, mini program, delivery apps.' },
  { n: '02', title: 'Hand out roles', text: 'Map headquarters, regional ops, store leads, finance, and support before the first login.' },
  { n: '03', title: 'Run the day', text: 'Watch the board, clear exceptions, and export the numbers finance asks for at 6 p.m.' },
]

const plans = [
  { name: 'Starter', monthly: 39, stores: 'Up to 5 stores', points: ['Morning board', '2 roles', 'CSV export'] },
  { name: 'Growth', monthly: 99, stores: 'Up to 30 stores', points: ['Exception queue', 'All roles', 'Command screen'], featured: true },
  { name: 'Scale', monthly: 249, stores: 'Unlimited stores', points: ['SSO-ready layout', 'Audit-friendly exports', 'Priority onboarding'] },
]

const faqs = [
  {
    q: 'Is Northline a live product?',
    a: 'No. It is a portfolio sample: this marketing page, an admin console, and a command screen. The numbers are fictional.',
  },
  {
    q: 'Can you build this for a real chain?',
    a: 'Yes. The usual first slice is the admin and one data source. The wall display and this landing page can be scoped separately.',
  },
  {
    q: 'Does the demo request send an email?',
    a: 'No. The form only confirms in the browser so the page can be reviewed without a backend.',
  },
  {
    q: 'What is the stack on this page?',
    a: 'Next.js, TypeScript, and Tailwind. The admin is Vue 3 and Element Plus. The command screen is React and ECharts.',
  },
  {
    q: 'How long is a first usable version?',
    a: 'A scoped back office with login, roles, orders, and a dashboard is often a few weeks, once the data source is known.',
  },
]

export function Landing() {
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState(false)
  const [yearly, setYearly] = useState(true)
  const [sent, setSent] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [note, setNote] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  function submit(event: FormEvent) {
    event.preventDefault()
    if (name.trim().length < 2 || !email.includes('@')) {
      setError('Add a name and a valid email. Nothing is sent.')
      return
    }
    setError('')
    setSent(true)
  }

  function openDemo() {
    setSent(false)
    setError('')
    setOpen(true)
    setMenu(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-700 text-white">N</span>
            Northline
          </a>
          <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-slate-900">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="hidden md:block">
            <button className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white" onClick={openDemo}>
              Book a walkthrough
            </button>
          </div>
          <button className="text-sm md:hidden" onClick={() => setMenu((value) => !value)} aria-expanded={menu}>
            Menu
          </button>
        </div>
        {menu && (
          <div className="space-y-3 border-t border-slate-200 px-5 py-4 md:hidden">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="block" onClick={() => setMenu(false)}>
                {item.label}
              </a>
            ))}
            <button className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white" onClick={openDemo}>
              Book a walkthrough
            </button>
          </div>
        )}
      </header>

      <main id="top">
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:py-24">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <p className="mb-4 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800">
              Portfolio sample · retail operations
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl sm:leading-tight">
              Run 30 stores without 30 spreadsheets.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              Northline gives a multi-location team one picture of sales, roles, and the orders that need a person. The product is fictional. The page is a working sample.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="rounded-full bg-blue-700 px-5 py-3 text-sm font-medium text-white" onClick={openDemo}>
                Book a walkthrough
              </button>
              <a href="#pricing" className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium">
                See sample pricing
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08 }} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-card">
            <div className="mb-4 flex items-center justify-between text-xs text-slate-500">
              <span>Today · 128 stores online</span>
              <span className="rounded-full bg-emerald-50 px-2 py-1 text-emerald-700">Live sample</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                ['GMV', '¥1.28m'],
                ['Orders', '3,842'],
                ['Late', '17'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl bg-slate-50 p-3">
                  <div className="text-xs text-slate-500">{label}</div>
                  <div className="mt-1 text-xl font-semibold">{value}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex h-28 items-end gap-2 rounded-xl bg-slate-950 px-4 py-3">
              {[40, 48, 44, 62, 58, 74, 70, 86].map((height) => (
                <div key={height} className="flex-1 rounded-t bg-sky-400" style={{ height: `${height}%` }} />
              ))}
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex justify-between border-b border-slate-100 pb-2">
                <span>Shanghai Qiantan · 3 late deliveries</span>
                <span className="text-rose-600">High</span>
              </li>
              <li className="flex justify-between">
                <span>Wuhan Optics Valley · beef noodle stock</span>
                <span className="text-amber-600">Watch</span>
              </li>
            </ul>
          </motion.div>
        </section>

        <section id="product" className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <h2 className="text-3xl font-semibold tracking-tight">What the operator actually opens</h2>
            <p className="mt-3 max-w-2xl text-slate-600">Six jobs the sample product covers. Each one maps to a screen in the admin or the command display.</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <article key={feature.title} className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{feature.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-3xl font-semibold tracking-tight">From first import to the evening close</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.map((step) => (
              <article key={step.n} className="rounded-2xl bg-slate-950 p-6 text-white">
                <div className="text-sm text-sky-300">{step.n}</div>
                <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="pricing" className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight">Sample pricing</h2>
                <p className="mt-2 text-slate-600">Illustrative numbers for the fictional product, billed per month.</p>
              </div>
              <button
                className="rounded-full border border-slate-300 px-4 py-2 text-sm"
                onClick={() => setYearly((value) => !value)}
                aria-pressed={yearly}
              >
                {yearly ? 'Yearly · 20% off' : 'Monthly'}
              </button>
            </div>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {plans.map((plan) => {
                const price = yearly ? Math.round(plan.monthly * 0.8) : plan.monthly
                return (
                  <article key={plan.name} className={`rounded-2xl border p-6 ${plan.featured ? 'border-blue-700 bg-blue-700 text-white' : 'border-slate-200 bg-white'}`}>
                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                    <p className={`mt-1 text-sm ${plan.featured ? 'text-blue-100' : 'text-slate-500'}`}>{plan.stores}</p>
                    <p className="mt-4 text-4xl font-semibold">${price}<span className="text-base font-normal">/mo</span></p>
                    <ul className="mt-4 space-y-2 text-sm">
                      {plan.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                    <button
                      className={`mt-6 w-full rounded-full px-4 py-2 text-sm font-medium ${plan.featured ? 'bg-white text-blue-800' : 'bg-slate-900 text-white'}`}
                      onClick={openDemo}
                    >
                      Talk through this plan
                    </button>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-3xl px-5 py-16">
          <h2 className="text-3xl font-semibold tracking-tight">Questions</h2>
          <div className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
            {faqs.map((item) => (
              <details key={item.q} className="group py-4">
                <summary className="cursor-pointer list-none font-medium">{item.q}</summary>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="px-5 pb-16">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 rounded-3xl bg-slate-950 px-8 py-10 text-white">
            <div>
              <h2 className="text-2xl font-semibold">Need the admin, the screen, or the page?</h2>
              <p className="mt-2 text-sm text-slate-300">Tell us which surface you want first. The walkthrough form stays on this device.</p>
            </div>
            <button className="rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950" onClick={openDemo}>
              Book a walkthrough
            </button>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 px-5 py-8 text-sm text-slate-500">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3">
          <span>Northline portfolio sample. Not a commercial service.</span>
          <span>Next.js · Tailwind · paired with the Vue admin and React screen</span>
        </div>
      </footer>

      {open && (
        <div className="fixed inset-0 z-30 grid place-items-center bg-slate-950/50 p-4" onClick={() => setOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-card"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="demo-title" className="text-xl font-semibold">Book a walkthrough</h2>
            {sent ? (
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Saved in this browser only, {name}. This demo does not email anyone. Refresh and the note is gone.
              </p>
            ) : (
              <form className="mt-4 space-y-3" onSubmit={submit}>
                <label className="block text-sm">
                  Name
                  <input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" value={name} onChange={(event) => setName(event.target.value)} />
                </label>
                <label className="block text-sm">
                  Email
                  <input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" value={email} onChange={(event) => setEmail(event.target.value)} />
                </label>
                <label className="block text-sm">
                  What should the first version include?
                  <textarea className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" rows={3} value={note} onChange={(event) => setNote(event.target.value)} />
                </label>
                {error && <p className="text-sm text-rose-600">{error}</p>}
                <button className="w-full rounded-full bg-blue-700 py-2 text-sm font-medium text-white" type="submit">
                  Keep it on this page
                </button>
              </form>
            )}
            <button className="mt-3 text-sm text-slate-500" onClick={() => setOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}
