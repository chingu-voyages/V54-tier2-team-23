import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-custom-blue text-black  flex items-center p-4 justify-center gap-2">
            <Link className="" href="https://github.com/chingu-voyages/V54-tier2-team-23">
                <Image src="images/githubIcon.svg" alt="location icon" width={25} height={25} />
            </Link>

            <p className=" font-[open sans] not-italic font-normal leading-[normal] flex justify-center">
                ©2025 Ember AI. All Rights Reserved
            </p>
        </footer>
    );
}
