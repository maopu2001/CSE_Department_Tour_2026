import { Briefcase, CircleX, GlobeOff, ShieldQuestionMark } from "lucide-react";

export default function Guidelines() {
  return (
    <main className="mx-auto w-9/10 space-y-8 py-10 text-foreground font-bangla">
      <header className="space-y-4 text-center">
        <h1 className="text-3xl font-bold md:text-4xl">
          গুরুত্বপূর্ণ নির্দেশিকা
        </h1>
        <p className="text-lg text-muted-foreground">
          সফরে রওনা হওয়ার আগে নিচের নির্দেশনাগুলো দেখে নিন। এটি প্রস্তুতি,
          নিরাপত্তা, এবং শৃঙ্খলা বজায় রাখতে সাহায্য করবে।
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <h2 className="inline-flex items-center gap-2 text-xl font-semibold text-foreground">
            <Briefcase className="text-accent" /> সাথে যা রাখবেন
          </h2>
          <ul className="mt-4 space-y-3 pl-5 text-muted-foreground marker:text-accent list-disc">
            <li>স্টুডেন্ট আইডি কার্ড এবং জাতীয় পরিচয়পত্র</li>
            <li>প্রয়োজনীয় কাপড় ও অতিরিক্ত পোশাক</li>
            <li>
              ব্যক্তিগত ঔষধ ও ফার্স্ট এইড
              <span className="block text-sm text-muted-foreground/90">
                Paracetamol, Maxpro, Antacid, Flagyl সহ কিছু প্রাথমিক ঔষধ
                আয়োজকদের পক্ষ থেকে প্রয়োজনে সরবরাহ করা হবে।
              </span>
            </li>
            <li>নিজের তোয়ালে ও ব্যক্তিগত ব্যবহার্য জিনিস</li>
            <li>জঙ্গল ও সমুদ্র সৈকতে হাঁটার জন্য স্যান্ডেল ও আরামদায়ক জুতা</li>
            <li>মোবাইল ফোন ও চার্জার / পাওয়ার ব্যাংক</li>
            <li>ছাতা / রেইনকোট</li>
            <li>সানগ্লাস / ক্যাপ</li>
            <li>মশার স্প্রে / ক্রিম</li>
            <li>প্রয়োজনীয় নগদ টাকা</li>
          </ul>
        </article>

        <div className="space-y-6 flex flex-col">
          <article className="rounded-3xl border border-border bg-card p-6 shadow-sm ">
            <h2 className="inline-flex items-center gap-2 text-xl font-semibold text-foreground">
              <GlobeOff className="text-accent" /> নেটওয়ার্ক সম্পর্কিত তথ্য
            </h2>
            <ul className="mt-4 space-y-3 pl-5 text-muted-foreground marker:text-accent list-disc">
              <li>
                সুন্দরবনের অনেক স্থানে মোবাইল নেটওয়ার্ক দুর্বল বা নাও থাকতে
                পারে।
              </li>
              <li>Teletalk নেটওয়ার্ক তুলনামূলক ভালো পাওয়া যায়।</li>
            </ul>
          </article>

          <article className="rounded-3xl border border-border bg-card p-6 shadow-sm grow">
            <h2 className="inline-flex items-center gap-2 text-xl font-semibold text-foreground">
              <CircleX className="text-accent" /> সাথে না রাখাই ভালো
            </h2>
            <ul className="mt-4 space-y-3 pl-5 text-muted-foreground marker:text-accent list-disc">
              <li>অতিরিক্ত মূল্যবান জিনিস</li>
              <li>ঝুঁকিপূর্ণ বা নিষিদ্ধ সামগ্রী</li>
              <li>অপ্রয়োজনীয় ভারী লাগেজ</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
        <h2 className="inline-flex items-center gap-2 text-xl font-semibold text-foreground">
          <ShieldQuestionMark className="text-accent" /> অতিরিক্ত নির্দেশনা
        </h2>
        <ul className="mt-4 space-y-3 pl-5 text-muted-foreground marker:text-accent list-disc">
          <li>DSLR বা অন্যান্য পেশাদার ডিজিটাল ক্যামেরা বহন করা যাবে না।</li>
          <li>
            ছোট Soundbox শুধুমাত্র আড্ডা/বিনোদনের উদ্দেশ্যে আনা যাবে। তবে
            বন্যপ্রাণীর সমস্যা হয় বা অভয়ারণ্যে অবস্থানকালে উচ্চ শব্দ সৃষ্টি
            হয়—এমনভাবে ব্যবহার করা যাবে না।
          </li>
        </ul>
      </section>

      <section className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
        <h2 className="inline-flex items-center gap-2 text-xl font-semibold text-foreground">
          <ShieldQuestionMark className="text-accent" /> শিক্ষা সফর ২০২৬ —
          সংক্ষিপ্ত নির্দেশনা
        </h2>
        <ol className="mt-4 space-y-3 pl-5 text-muted-foreground marker:text-accent list-decimal">
          <li>সময়সূচি এবং শিক্ষক ও আয়োজকদের নির্দেশনা মেনে চলতে হবে।</li>
          <li>দলবদ্ধভাবে চলাফেরা করতে হবে।</li>
          <li>অনুমতি ছাড়া নির্ধারিত এলাকা ত্যাগ করা যাবে না।</li>
          <li>শৃঙ্খলা ও নিরাপত্তা বজায় রাখতে হবে।</li>
          <li>পরিবেশ ও বিশ্ববিদ্যালয়ের ভাবমূর্তি রক্ষা করতে হবে।</li>
          <li>জরুরি প্রয়োজনে শিক্ষক বা আয়োজকদের জানাতে হবে।</li>
        </ol>
      </section>
    </main>
  );
}
