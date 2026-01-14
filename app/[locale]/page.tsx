import Scene from "../components/Scene";
import { setRequestLocale, getMessages } from "next-intl/server";

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <main className="min-h-screen bg-black">
      <Scene messages={messages} locale={locale} />
    </main>
  );
}
