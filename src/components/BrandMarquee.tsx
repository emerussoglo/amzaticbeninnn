import styles from "@/components/BrandMarquee.module.css";

const brands = [
  {
    name: "HP",
    image:
      "https://kreafolk.com/cdn/shop/articles/Rewrite_HP_Logo_Design_History_Evolution_9_2881e760-4c0c-40ca-9e51-8eea2201e580.jpg?v=1787037894&width=2048",
  },
  {
    name: "ASUS",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg",
  },
  {
    name: "Lenovo",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg",
  },
  {
    name: "Apple",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
  {
    name: "Dell",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg",
  },
  {
    name: "LG",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/8d/LG_logo_%282014%29.svg",
  },
  {
    name: "Acer",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/00/Acer_2011.svg",
  },
  {
    name: "MSI",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/91/Micro-Star_International_logo.svg",
  },
  {
    name: "Epson",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/59/Epson_logo.svg",
  },
  {
    name: "Brother",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/87/Brother_logo.svg",
  },
  {
    name: "Xerox",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Xerox_logo_%281968-2008%29.svg",
  },
];

export default function BrandMarquee() {
  return (
    <section
      className={styles.brandMarquee}
      aria-label="Marques disponibles chez AMZATIC"
    >
      <div className={styles.heading}>
        <span>LA TECHNOLOGIE EN CONFIANCE</span>
        <h2>Les marques que vous aimez</h2>
      </div>
      <div className={styles.window}>
        <div className={styles.track}>
          {[...brands, ...brands].map((brand, index) => (
            <div
              className={styles.item}
              key={`${brand.name}-${index}`}
              aria-hidden={index >= brands.length}
            >
              <img
                src={brand.image}
                alt={index < brands.length ? brand.name : ""}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
