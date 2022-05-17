import Link from "next/link";
import { useRouter } from "next/router";

function About() {
  const router = useRouter();

  return (
    <div>
      <ul>
        <li>
          <a onClick={() => router.push("/posts/abc")}>go to posts/[id].tsx</a>
        </li>
      </ul>
    </div>
  );
}

export default About;
