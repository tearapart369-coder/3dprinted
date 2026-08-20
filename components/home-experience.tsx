'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { configuratorDefaults, galleryCards, storyStages, worldStyles } from '@/lib/site-data';

type LayerKey = 'skin' | 'outfit' | 'accessory' | 'pedestal';

const currency = new Intl.NumberFormat('en-BD');

function ProductImage({ label, src, className = '' }: { label: string; src?: string; className?: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className={`product-art ${className}`} aria-label={`${label} transparent product photography`}>
      <div className="product-art__aura" />
      {src && !failed ? (
        <img src={src} alt={label} loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <div className="product-art__body" />
      )}
      <div className="product-art__pedestal" />
      <figcaption>{label}</figcaption>
    </figure>
  );
}

function DustField({ dense = false }: { dense?: boolean }) {
  const dots = useMemo(() => Array.from({ length: dense ? 120 : 72 }, (_, i) => i), [dense]);

  return (
    <div className="dust-field" aria-hidden="true">
      {dots.map((dot) => (
        <i
          key={dot}
          style={{
            left: `${(dot * 41) % 100}%`,
            top: `${(dot * 23) % 100}%`,
            animationDuration: `${6 + (dot % 9)}s`,
            animationDelay: `${dot * 0.09}s`,
          }}
        />
      ))}
    </div>
  );
}

function Hero() {
  return (
    <section className="hero-section" id="top">
      <DustField dense />
      <div className="hero-product" data-sprite="24-frame-couple-orbit">
        <ProductImage label="Couple miniature" src="/images/couple.webp" />
      </div>
      <div className="hero-copy">
        <p className="eyebrow">Premium hand-painted miniatures</p>
        <h1 className="gold-text">3IDOLON — A memory, given a shape.</h1>
        <p>
          A cinematic commissioning experience for turning photographs, people, vows, firsts, machines, companions, and impossible
          little stories into physical keepsakes.
        </p>
        <div className="button-row">
          <a className="btn btn-gold" href="#configurator">Begin Your Memory →</a>
          <a className="btn btn-ghost" href="#worlds">Explore the Worlds</a>
        </div>
      </div>
    </section>
  );
}

function StoryScroll() {
  const containerRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const raw = Math.min(1, Math.max(0, -rect.top / scrollable));
      setProgress(raw);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  const activeStage = Math.min(storyStages.length - 1, Math.floor(progress * storyStages.length));

  return (
    <section className="story-shell" ref={containerRef}>
      <div className="story-sticky" style={{ backgroundColor: storyStages[activeStage].color }}>
        <div className="story-vignette" />
        {storyStages.map((stage, index) => {
          const isActive = index === activeStage;
          return (
            <article
              className={`story-stage story-stage--${stage.enter} ${isActive ? 'is-active' : ''}`}
              key={stage.title}
              aria-hidden={!isActive}
            >
              <ProductImage label={stage.title} src={stage.image} />
            </article>
          );
        })}
        <div className={`story-copy ${activeStage === 3 ? 'story-copy--dark' : ''}`}>
          <p>{storyStages[activeStage].text}</p>
          <span>{storyStages[activeStage].title}</span>
        </div>
      </div>
      <div className="story-ending">
        <h2 className="gold-text">Some memories shouldn&apos;t live only in your camera roll.</h2>
        <a className="btn btn-gold" href="#worlds">Give yours a shape.</a>
      </div>
    </section>
  );
}

function GalleryAndWorlds() {
  const [selected, setSelected] = useState(galleryCards[0].id);
  const [rippling, setRippling] = useState(false);
  const selectedWorld = galleryCards.find((card) => card.id === selected) ?? galleryCards[0];
  const style = worldStyles[selectedWorld.id];

  const chooseWorld = (id: typeof galleryCards[number]['id']) => {
    setSelected(id);
    setRippling(true);
    window.setTimeout(() => setRippling(false), 850);
  };

  return (
    <section className="world-gallery" id="worlds">
      <div className={`screen-ripple ${rippling ? 'is-active' : ''}`} style={{ background: selectedWorld.color }} />
      <DustField />
      <div className="section-heading">
        <p className="eyebrow">The Memory Gallery</p>
        <h2 className="gold-text">Six worlds. One doorway into yours.</h2>
      </div>
      <div className="gallery-grid">
        {galleryCards.map((card, index) => (
          <button
            className={`world-card ${selected === card.id ? 'is-selected' : ''}`}
            key={card.id}
            onClick={() => chooseWorld(card.id)}
            style={{ animationDelay: `${index * 85}ms` }}
          >
            <span className="world-card__icon">{card.icon}</span>
            <ProductImage label={card.title} src={card.product} />
            <strong>{card.title}</strong>
            <small>{card.copy}</small>
          </button>
        ))}
      </div>
      <article className="world-deep-dive" style={{ background: style.background, color: style.text }}>
        <div className="world-deep-dive__texture" style={{ backgroundImage: style.texture }} />
        <div>
          <p className="eyebrow">{selectedWorld.title} World</p>
          <h3>{style.headline}</h3>
          <p>{style.description}</p>
          <div className="tab-row">
            {style.tabs.map((tab) => <button key={tab}>{tab}</button>)}
          </div>
          <div className="before-after" aria-label="Before and after slider mockup">
            <span>Original Photo</span>
            <input type="range" min="0" max="100" defaultValue="52" />
            <span>Finished Miniature</span>
          </div>
          <a className="btn btn-gold" href="#configurator">Customize This Memory</a>
        </div>
        <div className="world-product-wrap">
          <ProductImage label={`${selectedWorld.title} hero miniature`} src={selectedWorld.product} />
          <p className="price-shimmer">BDT {currency.format(style.price)}</p>
        </div>
      </article>
    </section>
  );
}

function Configurator() {
  const [tier, setTier] = useState<'signature' | 'grand'>('signature');
  const [extraPerson, setExtraPerson] = useState(false);
  const [displayCase, setDisplayCase] = useState(false);
  const [engraving, setEngraving] = useState('Rohan & Meher');
  const [layers, setLayers] = useState<Record<LayerKey, string>>({
    skin: 'warm',
    outfit: 'gold',
    accessory: 'bouquet',
    pedestal: 'wood',
  });

  const total =
    (tier === 'grand' ? configuratorDefaults.grandPrice : configuratorDefaults.basePrice) +
    (extraPerson ? configuratorDefaults.addOns.extraPerson : 0) +
    (displayCase ? configuratorDefaults.addOns.displayCase : 0) +
    (engraving.trim() ? configuratorDefaults.addOns.engraving : 0);

  const updateLayer = (key: LayerKey, value: string) => setLayers((current) => ({ ...current, [key]: value }));

  return (
    <section className="configurator" id="configurator">
      <div className="configurator-preview">
        <div className="layer-stack" aria-label="Six-layer transparent PNG configurator preview">
          <div className="preview-layer preview-layer--base"><ProductImage label="Base silhouette" src={configuratorDefaults.layers[0].src} /></div>
          <div className={`preview-layer preview-layer--skin preview-layer--${layers.skin}`}><ProductImage label={`${layers.skin} skin`} src={`/images/layers/skin-${layers.skin}.webp`} /></div>
          <div className={`preview-layer preview-layer--outfit preview-layer--${layers.outfit}`}><ProductImage label={`${layers.outfit} outfit`} src={`/images/layers/outfit-${layers.outfit}.webp`} /></div>
          <div className={`preview-layer preview-layer--accessory preview-layer--${layers.accessory}`}><ProductImage label={layers.accessory} src={`/images/layers/${layers.accessory}.webp`} /></div>
          <div className={`preview-layer preview-layer--pedestal preview-layer--${layers.pedestal}`}><ProductImage label={`${layers.pedestal} pedestal`} src={`/images/layers/pedestal-${layers.pedestal}.webp`} /></div>
          <canvas className="preview-layer preview-layer--engraving" aria-label="Dynamic engraving canvas layer" />
          <strong className="engraving-text">{engraving}</strong>
        </div>
      </div>
      <form className="configurator-controls">
        <p className="eyebrow">The Wish Machine</p>
        <h2>Customize This Memory</h2>
        <fieldset>
          <legend>1. Format Selection</legend>
          <div className="choice-row">
            <button type="button" className={tier === 'signature' ? 'is-active' : ''} onClick={() => setTier('signature')}>Figurine · BDT 8,500</button>
            <button type="button" className={tier === 'grand' ? 'is-active' : ''} onClick={() => setTier('grand')}>Wooden Clock · BDT 11,500</button>
          </div>
        </fieldset>
        <fieldset>
          <legend>2. Appearance, color & props</legend>
          <div className="swatch-row">
            {['gold', 'red', 'blue', 'ivory'].map((color) => <button aria-label={`${color} outfit`} key={color} type="button" className={`swatch swatch--${color}`} onClick={() => updateLayer('outfit', color)} />)}
          </div>
          <div className="choice-row">
            {['bouquet', 'cake', 'helmet'].map((prop) => <button type="button" key={prop} onClick={() => updateLayer('accessory', prop)}>{prop}</button>)}
          </div>
        </fieldset>
        <label>
          3. Story Input
          <textarea placeholder="What happened just before this photograph? What should we never forget?" />
        </label>
        <label className="upload-zone">4. Drag and drop reference photos here</label>
        <label>
          Engraving Text
          <input value={engraving} onChange={(event) => setEngraving(event.target.value)} />
        </label>
        <label className="check-row"><input type="checkbox" checked={extraPerson} onChange={(event) => setExtraPerson(event.target.checked)} /> Extra Person (+BDT 1,500)</label>
        <label className="check-row"><input type="checkbox" checked={displayCase} onChange={(event) => setDisplayCase(event.target.checked)} /> Premium Display Case (+BDT 1,500)</label>
        <div className="total-row"><span>Total</span><strong className="price-shimmer">BDT {currency.format(total)}</strong></div>
        <a className="btn btn-gold" href="#review">Continue to Review</a>
      </form>
    </section>
  );
}

function ReviewCheckoutAndAftercare() {
  const steps = ['Story Received', 'Consultation', 'Sculpting', 'Preview', 'Printing', 'Hand-Painting', 'Home'];

  return (
    <>
      <section className="review" id="review">
        <ProductImage label="Your Memory" src="/images/review-memory.webp" />
        <div>
          <p className="eyebrow">Design Review</p>
          <h2 className="gold-text">Your Memory.</h2>
          <p>One final look before we begin. Thank you for trusting us with this moment.</p>
          <ul>
            <li>Scene: Warm ballroom couple miniature</li>
            <li>Color: Gold outfit with walnut pedestal</li>
            <li>Engraving: Rohan & Meher</li>
            <li>Price breakdown: clear, calm, and transparent</li>
          </ul>
          <a className="btn btn-gold" href="#checkout">Continue to Commission →</a>
        </div>
      </section>
      <section className="checkout" id="checkout">
        <div>
          <p className="eyebrow">Quiet, trusted checkout</p>
          <h2>Begin the Making</h2>
          <p>Guest checkout enabled. SSLCommerz-ready payment lanes for bKash, Nagad, cards, and bank routes.</p>
          <p className="slot-note">5 commission slots remain this month.</p>
          <button className="btn btn-gold">Begin the Making →</button>
        </div>
      </section>
      <section className="timeline-section">
        <h2 className="gold-text">Your Memory Is Being Crafted.</h2>
        <p>Thank you for letting us be part of your story. We will reach out via WhatsApp with handmade progress updates.</p>
        <ol className="timeline">
          {steps.map((step) => <li key={step}>{step}</li>)}
        </ol>
      </section>
    </>
  );
}

function ProductDetailAndMuseum() {
  const keepsakes = ['Sarah – 5th Anniversary', 'Arif – First Bike', 'Meher – Graduation', 'Nila – Family Eid'];

  return (
    <>
      <section className="iconic-product">
        <div>
          <ProductImage label="Ducati sprite sheet" src="/images/ducati_studio.webp" className="product-art--detail" />
          <div className="choice-row choice-row--center"><button>🔆 Studio Lighting</button><button>🌙 Night Lighting</button></div>
        </div>
        <div>
          <p className="eyebrow">Iconic Collection</p>
          <h2 className="gold-text">Legends you can hold. Icons you can own.</h2>
          <p>Ready-made collectibles keep the same rule: transparent product photography, sprite-sheet rotation, and no blocky realtime 3D placeholders.</p>
          <ul><li>Resin, hand-painted lacquer</li><li>15cm x 8cm x 6cm</li><li>Wooden plaque base</li></ul>
          <p className="price-shimmer">BDT 9,500</p>
          <button className="btn btn-ready">Add to Cart – Ready to Ship</button>
        </div>
      </section>
      <section className="unboxing">
        <div className="section-heading"><p className="eyebrow">Seven-layer unboxing</p><h2 className="gold-text">The goodbye is thankful. The arrival is ceremonial.</h2></div>
        <div className="unboxing-steps">
          {['Branded box', 'Wooden box', 'Tissue', 'Foam', 'Miniature', 'Certificate', 'Handwritten note'].map((step) => <article key={step}><ProductImage label={step} src={`/images/unboxing/${step.toLowerCase().replace(/\s+/g, '-')}.webp`} /><strong>{step}</strong></article>)}
        </div>
      </section>
      <section className="museum">
        <div className="section-heading"><p className="eyebrow">Memory Keepers Wall</p><h2 className="gold-text">Proof that the emotion survives the making.</h2></div>
        <div className="museum-grid">
          {keepsakes.map((memory) => <article key={memory}><ProductImage label={memory} src={`/images/museum/${memory.toLowerCase().split(' ')[0]}.webp`} /><h3>{memory}</h3><p>“She cried when she opened it.”</p></article>)}
        </div>
      </section>
    </>
  );
}

export default function HomeExperience() {
  return (
    <main>
      <Hero />
      <StoryScroll />
      <GalleryAndWorlds />
      <Configurator />
      <ReviewCheckoutAndAftercare />
      <ProductDetailAndMuseum />
    </main>
  );
}
