"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/authService";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      if (err.errors && err.errors.email) {
        setError(err.errors.email[0]);
      } else {
        setError("Ocorreu um erro ao tentar fazer login.");
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-black">
      <div className="flex w-full flex-col items-center justify-center px-8 pb-32 pt-8 text-white md:w-1/2">
        <div className="w-full max-w-md space-y-12">
          <div className="flex flex-col items-center">
            <Image
              src="/images/logo.png"
              alt="CF MOEMA Logo"
              width={250}
              height={80}
              className="object-contain"
            />
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold tracking-wide">
              BEM-VINDO DE VOLTA
            </h2>
            <p className="text-sm text-gray-400">Insira seus Dados</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Insira o seu email"
                  required
                  className="block w-full rounded-md border border-gray-800 bg-black p-3 text-sm text-white placeholder-gray-600 focus:border-white focus:outline-none focus:ring-1 focus:ring-white transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Senha
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  required
                  className="block w-full rounded-md border border-gray-800 bg-black p-3 text-sm text-white placeholder-gray-600 focus:border-white focus:outline-none focus:ring-1 focus:ring-white transition-colors"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm font-medium text-center">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-700 bg-black text-white focus:ring-white focus:ring-offset-black cursor-pointer"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-xs font-medium text-gray-300 cursor-pointer"
                >
                  Lembrar-se
                </label>
              </div>

              <Link
                href="/recuperar-senha"
                className="text-xs font-medium text-gray-300 hover:text-white transition-colors"
              >
                Esqueci a Senha
              </Link>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-white py-3 px-4 text-sm font-bold text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black transition-colors"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden md:block md:w-1/2 relative bg-zinc-900 border-l border-zinc-800">
        <Image
          src="/images/login-image.png"
          alt="Ambiente da academia de Crossfit"
          fill
          className="object-cover grayscale brightness-75"
        />
      </div>
    </div>
  );
}