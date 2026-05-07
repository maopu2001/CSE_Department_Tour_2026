export default function OtherInfo() {
  return (
    <main className="mx-auto w-9/10 space-y-8 py-10 text-foreground font-bangla">
      <header className="space-y-4 text-center">
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">
          ফুল ট্রিপ প্ল্যান
        </h1>
        <p className="text-lg text-muted-foreground">
          নীচে পুরো যাত্রাপথ, প্রতিদিনের অভিজ্ঞতা, এবং ফেরার সময় একসাথে দেওয়া
          হলো, যাতে যাত্রার আগে পুরো পরিকল্পনাটা স্পষ্ট থাকে।
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
          <h2 className="text-xl font-semibold text-foreground">যাত্রার সময়</h2>
          <div className="mt-4 space-y-3 text-muted-foreground">
            <p>১০ মে, ২০২৬, রবিবার, ফিশারি বাঁধ এলাকা থেকে বাস ছাড়বে।</p>
            <p className="font-medium text-foreground">
              বাস ছাড়ার সময়: দুপুর ১:০০ টা
            </p>
            <p>
              দুপুরের খাবার নিজ দায়িত্বে খেয়ে বাসে ওঠার জন্য অনুরোধ করা হলো।
            </p>
          </div>
        </article>

        <article className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
          <h2 className="text-xl font-semibold text-foreground">
            খাবার ও বিরতি
          </h2>
          <div className="mt-4 space-y-3 text-muted-foreground">
            <p>
              যাওয়ার দিন রাতের খাবার রাত ১০টার মধ্যে এবং ফেরত আসার দিন রাতের
              খাবার রাত ৭টা থেকে ৯টার মধ্যে দেওয়া হবে।
            </p>
            <p>খাবার এবং অন্যান্য প্রয়োজনের জন্য মোট ২ বার বিরতি দেওয়া হবে।</p>
            <p>
              যাওয়া এবং আসার দিনও রাতের খাবার আয়োজকরা আয়োজন করবেন। স্ন্যাক্স বা
              অন্য কিছু দরকার হলে নিজ দায়িত্বে নিতে হবে।
            </p>
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
        <h2 className="text-xl font-semibold text-foreground">
          শিপে যাত্রার শুরু
        </h2>
        <p className="mt-3 text-base leading-7 text-muted-foreground">
          ৪নং BIWTA ঘাট, খুলনা থেকে আনুমানিক রাত ৩:০০ টায় শিপ ছাড়বে।
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <article className="rounded-3xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-accent/40">
          <p className="text-sm font-semibold uppercase text-accent">১ম দিন</p>
          <h2 className="mt-2 text-2xl font-bold text-foreground">
            প্রকৃতির আহ্বান
          </h2>
          <div className="mt-4 space-y-3 text-muted-foreground">
            <p>সকালে পৌঁছে শুরু হবে সুন্দরবন এক্সপ্লোরেশন।</p>
            <ul className="space-y-2 pl-5 marker:text-accent list-disc">
              <li>আন্ধার মানিক ইকো ট্যুরিজম কেন্দ্র</li>
              <li>কটকা অফিস পাড়া</li>
              <li>সময় ও সুযোগ থাকলে: টাইগার টিলা</li>
            </ul>
            <p>
              প্রথম দিনেই আপনি অনুভব করবেন সুন্দরবনের প্রকৃত সৌন্দর্য, নীরবতা আর
              বন্য পরিবেশের অনন্য অভিজ্ঞতা।
            </p>
          </div>
        </article>

        <article className="rounded-3xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-accent/40">
          <p className="text-sm font-semibold uppercase text-accent">২য় দিন</p>
          <h2 className="mt-2 text-2xl font-bold text-foreground">
            সমুদ্র, বন আর অ্যাডভেঞ্চার
          </h2>
          <div className="mt-4 space-y-3 text-muted-foreground">
            <p>সকাল শুরু হবে দারুণ এক অভিজ্ঞতার মাধ্যমে।</p>
            <ul className="space-y-2 pl-5 marker:text-accent list-disc">
              <li>কটকা জামতলা সি বিচ</li>
              <li>জঙ্গল ট্র্যাকিং (Tiger Trail Experience)</li>
              <li>ছোট কটকা খাল দিয়ে কচিখালী যাত্রা</li>
              <li>কচিখালী টাইগার পয়েন্ট ট্র্যাকিং (সম্ভব হলে)</li>
              <li>কচিখালী অফিস পাড়া</li>
              <li>ডিমের চর (Deer Point / Bird Spot)</li>
            </ul>
            <p>দিনজুড়ে থাকবে প্রকৃতি, বন্যপ্রাণী আর রোমাঞ্চের মিশেল।</p>
          </div>
        </article>

        <article className="rounded-3xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-accent/40">
          <p className="text-sm font-semibold uppercase text-accent">৩য় দিন</p>
          <h2 className="mt-2 text-2xl font-bold text-foreground">ফিরে আসা</h2>
          <div className="mt-4 space-y-3 text-muted-foreground">
            <p>সকালে করমজল পরিদর্শন হবে।</p>
            <ul className="space-y-2 pl-5 marker:text-accent list-disc">
              <li>করমজল (Wildlife Breeding Center) পরিদর্শন</li>
            </ul>
            <p>
              তারপর ধীরে ধীরে ফেরার প্রস্তুতি নিয়ে দুপুর ৩টার মধ্যে খুলনা
              পৌঁছানো হবে, আনুমানিক।
            </p>
          </div>
        </article>
      </section>
    </main>
  );
}
