"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
const Nav = () => {
  const {data:session}:any = useSession();
  const [providers, setProviders] = useState<any>(null);
  const [toggleDropDown, setToggleDropDown] = useState<boolean>(false)

  useEffect(() => {
    const _setProvider = async () => {
      const response: any = await getProviders();
      setProviders(response);
    };
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link className="flex gap-2 flex-center" href="/">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">NEXT_APP</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              onClick={() => {
                signOut();
              }}
              className="outline_btn"
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user?.image}
                alt="logo"
                width={30}
                height={30}
                className="rounded"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user?.image}
              alt="logo"
              width={30}
              height={30}
              className="rounded"
              onClick={() => setToggleDropDown((prev)=>!prev)}
            />
            {toggleDropDown && (
              <div className="dropdown">
                <Link className="dropdown_link" href="/profile" onClick={() => setToggleDropDown(false)}>
                My Profile
                </Link>
                <Link className="dropdown_link" href="/create-profile" onClick={() => setToggleDropDown(false)}>
                Create Profile
                </Link>
                <button type="button" onClick={() => signOut()} className="mt-5 w-full black_btn">
                  Sign Out
                  </button>
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => signIn()}
            className="black_btn"
          >
            Sign In
          </button>
        )}
      </div>

    </nav>
  );
};

export default Nav;
