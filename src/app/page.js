// import Image from "next/image";
// import styles from "./page.module.css";
// import Link from "next/link";

// export default function Home() {
//   return (
//     <div className={styles.page}>
//       <h1> Hi , This is main page</h1>
//       <main>
//         <Link href="/calculator">Go to calculatorpage</Link>
//       </main>
//     </div>
//   );
// }

import Homepage from "../app/Pages/homepage/page";

export default function page() {
  return (
    <div>
      <Homepage />
    </div>
  );
}