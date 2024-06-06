import Image from "next/image"
import Link from "next/link"
import { dafoe } from "@/lib/fonts"
import styles from "../blog.module.css"
import useIcons from "@/hooks/useIcons"

export default function BlogArticle() {
  const { LikeIcon } = useIcons().action
  return (
    <article className={styles.articleContainer}>
      <div className={styles.articleHeader}>
        <Image src={"/images/nextjs.jpeg"} width={250} height={250} alt={"next.js"} />
        <div className="row space-between">
          <h2>Next.js fullstack portfolio application</h2>
          <div className="column gap-small items-end">
            <p className="margin-btm-large">6/6/2024</p>
            <LikeIcon className="custom-image-link" style={{fill: "#0072dd"}}/>
            <p className="paragraph-secondary textXs">Likes 2</p>
          </div>
        </div>
      </div>
      <section className={styles.articleSection}>
        <h3>Welcome</h3>
        <p>
          This is my first post for this blog. The idea behind creating this blog is to keep track of my learning and
          thought process during the development of this web app. I initially had a very simple static website built
          with plain HTML and CSS, and now it’s time for an upgrade.
        </p>
        <p>
          I have just finished <Link href={"https://courses.webdevsimplified.com/"}>WebDevSimplified&apos;s</Link> React
          and Next.js courses, and it’s time to put those newly learned skills into action. These courses are excellent,
          and Kyle, as a frontend development mentor, has a very clear way of explaining complicated topics. His
          teaching has really sparked my interest in frontend development.
        </p>
      </section>
      <section className={styles.articleSection}>
        <h3>Vision</h3>
        <p>
          Surely, it would be much easier and more convenient to implement a static website using plain React and
          Next.js, but where’s the fun in that?
        </p>
        <p>
          The vision here is to build a full-stack app using React and Next.js for the frontend and Node.js for the
          backend to serve data such as blogs and projects. I’m particularly interested in seeing the optimization
          Next.js can provide with server-side components compared to plain React.
        </p>
        <p>The final product should include:</p>
        <ul>
          <li>
            An admin dashboard to edit and create fully customizable blog post pages and project overview pages,
            including image uploads and data mutation.
          </li>
          <li>Settings to enable dark mode and language options if I delve into localization.</li>
          <li>An enhanced blog section with likes and comments.</li>
          <li>Of course, my portfolio and information.</li>
          <li>A contact section.</li>
          <li>Deployment in the cloud.</li>
          <li>And more…</li>
        </ul>
      </section>
      <section className={styles.articleSection}>
        <h3>Starting Point</h3>
        <p>
          As I mentioned, I have completed courses on React Beginner, React Advanced, and Next.js. Alongside these
          courses, I started to develop my own reusable, customizable, and documented component library, particularly
          for use in the development process of my new web app. You can check the repo{" "}
          <Link href={"https://github.com/Sami-Juhani/SJP-Components"}>here</Link>. I have a few components ready for my
          project:
        </p>
        <ul>
          <li>
            <span className="bold">MediaScroller:</span> A Netflix-inspired scroller to display projects. It takes data
            as a prop.
          </li>
          <li>
            <span className="bold">InfiniteCarouselScroller:</span> A fancier MediaScroller with endless looping through
            data. This was interesting to implement.
          </li>
          <li>
            <span className="bold">NotificationModal:</span> Displays different types of messages on screen, such as
            success, alert, and warning. The position can be configured.
          </li>
          <li>
            <span className="bold">FancyHero:</span> A hero section that includes a custom typewriter component to type
            and erase strings in the hero layout. The position of the typewriter can be configured.
          </li>
          <li>
            <span className="bold">StickyNav:</span> A header including a navbar that sticks. When the user scrolls down
            the page, the StickyNav sticks above the viewport and briefly slides in.
          </li>
        </ul>
        <figure>
          <div className="responsive-image">
            <Image
              src={"/images/inf_scroller.png"}
              alt="infinite media scroller"
              layout="responsive"
              width={500}
              height={500}
            />
          </div>
          <figcaption className="textSm">
            <i>InfiniteMediaScroller</i>
          </figcaption>
        </figure>
        <p>
          At this point, the app will only have the StickyNav and Blog section implemented. All the data will be
          hardcoded before implementing the backend server and setting up a database. The appearance will also be dull,
          but bear with me—it’s about to rock.
        </p>
        <p>You can view the app repo here.</p>
        <p>Thanks for reading this far. Check for updates and enjoy the summertime.</p>
        <p>Cheers,</p>
        <div className="column">
          <p className={`${dafoe.className} textXl`}>Sami Paananen</p>
          <p className="bold"> Junior Fullstack Developer</p>
        </div>
      </section>
    </article>
  )
}
