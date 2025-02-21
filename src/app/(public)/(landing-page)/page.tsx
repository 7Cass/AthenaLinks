import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChartPieIcon,
  CircleCheck,
  CircleXIcon,
  HourglassIcon,
  InfoIcon,
  LinkIcon,
  PaintbrushIcon,
  QrCodeIcon,
  QuoteIcon,
} from "lucide-react";
import Link from "next/link";

const testimonials = [
  {
    name: "Jane Doe",
    title: "CEO at ExampleCorp",
    quote:
      "This URL shortener has transformed how we track and manage our links. The analytics dashboard is a game-changer!",
  },
  {
    name: "John Smith",
    title: "Marketing Manager at SampleCo",
    quote:
      "I love how easy it is to create custom URLs and monitor their performance. The customer support is fantastic too!",
  },
  {
    name: "Emily Johnson",
    title: "Freelance Designer",
    quote:
      "The customizable link pages are perfect for branding. Highly recommend this service to anyone looking to optimize their links.",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col justify-center max-w-screen-xl mx-auto bg-background">
      <section
        id="home"
        className="w-full pt-24 px-8 mx-auto text-center space-y-8 border-x"
      >
        <h1 className="mx-12 text-7xl font-bold">
          Shorten Links, Gain Insights, Grow Your Business.
        </h1>
        <div className="max-w-xl mx-auto">
          <p className="text-xl text-muted-foreground leading-relaxed text-medium">
            Shorten your links, collect valuable data, and understand your
            audience like never before.
            <br />
            Turn every click into a step forward for your business.
          </p>
        </div>
        <div className="pt-8 flex flex-col gap-2 items-center justify-between">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <Link href="/dashboard">
                <Button
                  className="flex items-center justify-center gap-2"
                  size="lg"
                >
                  Get Started for Free{" "}
                  <TooltipTrigger asChild>
                    <InfoIcon size={18} />
                  </TooltipTrigger>
                </Button>
              </Link>
              <TooltipContent>
                <small className="text-sm text-muted-foreground">
                  Credit Card not required!
                </small>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="-mx-8 px-8 py-24 border-y">
          {/* <Image
            width={1280}
            height={768}
            className="w-full rounded"
            src="/images/print.png"
            alt="Print"
          /> */}
          <div className="bg-[url('/images/print.png')] bg-cover w-full h-[768px] rounded bg-zinc-200"></div>
        </div>
      </section>

      <section
        id="pricing"
        className="w-full py-24 px-8 mx-auto space-y-8 border-x border-b"
      >
        <div className="flex flex-col">
          <h2 className="w-full text-2xl font-bold mb-8">
            Explore Our Features
          </h2>
          <div className="max-w-lg text-lg text-muted-foreground">
            <p>
              Discover the powerful features we offer for individuals and
              businesses. <br /> Our platform provides advanced analytics and
              customizable options to meet your unique needs.
            </p>
          </div>
        </div>
        <div className="w-full flex items-stretch flex-wrap justify-center gap-6 pt-8">
          <div className="max-w-[320px] bg-background shadow-sm hover:shadow-lg transition-shadow ease-in border-2 border-primary rounded-md p-6 space-y-2">
            <ChartPieIcon size={20} className="text-primary mb-2" />
            <h3 className="text-xl font-semibold">Detailed Analytics</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              Gain detailed insights for each link, including click counts,
              geographic locations, and referral sources.
            </p>
          </div>
          <div className="max-w-[320px] bg-background shadow-sm hover:shadow-lg transition-shadow ease-in border-2 border-primary rounded-md p-6 space-y-2">
            <LinkIcon size={20} className="text-primary mb-2" />
            <h3 className="text-xl font-semibold">Customizable URLs</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              Make your URLs more recognizable and brand-friendly with
              customizable options.
            </p>
          </div>
          <div className="max-w-[320px] bg-background shadow-sm hover:shadow-lg transition-shadow ease-in border-2 border-primary rounded-md p-6 space-y-2">
            <HourglassIcon size={20} className="text-primary mb-2" />
            <h3 className="text-xl font-semibold">Link Expiration</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              Set expiration dates for your links to manage their active period.
            </p>
          </div>
          <div className="max-w-[320px] bg-background shadow-sm hover:shadow-lg transition-shadow ease-in border-2 border-primary rounded-md p-6 space-y-2">
            <QrCodeIcon size={20} className="text-primary mb-2" />
            <h3 className="text-xl font-semibold">QR Code Generation</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              Generate QR codes automatically for easy sharing and access to
              your shortened URLs.
            </p>
          </div>
          <div className="max-w-[320px] bg-background shadow-sm hover:shadow-lg transition-shadow ease-in border-2 border-primary rounded-md p-6 space-y-2">
            <PaintbrushIcon size={20} className="text-primary mb-2" />
            <h3 className="text-xl font-semibold">Custom Link Page</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              Personalize the page of your shortened link with ads or custom
              HTML/CSS.
            </p>
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className="w-full py-24 px-8 mx-auto space-y-8 border-x"
      >
        <div className="flex flex-col">
          <h2 className="w-full text-2xl font-bold mb-8">
            Unlock Premium Features
          </h2>
          <div className="max-w-xl text-lg text-muted-foreground">
            <p>
              Explore our flexible pricing plans tailored to meet your needs.
              Whether you&apos;re an individual or a business, we have the right
              plan for you.
            </p>
            <p>Or try our Free Plan to test the platform.</p>
          </div>
        </div>

        <div className="w-full flex items-stretch flex-wrap justify-center gap-6 pt-8">
          <div className="min-w-[320px] bg-background shadow-sm border rounded-md p-6">
            <Badge variant="outline">Free</Badge>
            <h3 className="text-4xl font-semibold mt-4 mb-8">$0/month</h3>
            <Separator />
            <div className="mt-8 mb-12 space-y-4">
              <small className="text-muted-foreground">Start with:</small>
              <div className="flex items-center gap-2">
                <CircleCheck size={24} />
                <p>5 Links</p>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CircleXIcon size={24} />
                <p className="line-through">Analytics Dashboard</p>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CircleXIcon size={24} />
                <p className="line-through">Priority Support</p>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CircleXIcon size={24} />
                <p className="line-through">Customizable URL</p>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CircleXIcon size={24} />
                <p className="line-through">Link Expiration</p>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CircleXIcon size={24} />
                <p className="line-through">QR Code Generation</p>
              </div>
            </div>
            <Link href="/dashboard">
              <Button variant="outline" className="w-full">
                Start for Free
              </Button>
            </Link>
          </div>

          <div className="relative overflow-hidden min-w-[320px] bg-background shadow-sm border-2 border-primary rounded-md p-6">
            <div className="px-10 py-1 absolute bg-primary -right-12 top-6 rotate-[45deg] text-background font-medium text-sm">
              Most Popular
            </div>
            <Badge variant="outline">Pro</Badge>
            <h3 className="text-4xl font-semibold mt-4 mb-8">$5/month</h3>
            <Separator />
            <div className="mt-8 mb-12 space-y-4">
              <small className="text-muted-foreground">
                Everything in the Free Plan, plus:
              </small>
              <div className="flex items-center gap-2">
                <CircleCheck size={24} />
                <p>100 Links</p>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck size={24} />
                <p>Basic Analytics</p>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck size={24} />
                <p>Priority Support</p>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck size={24} />
                <p>Customizable URLs</p>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck size={24} />
                <p>Link Expiration</p>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CircleXIcon size={24} />
                <p className="line-through">QR Code Generation</p>
              </div>
            </div>
            <Link href="/billing">
              <Button className="w-full">Get Started</Button>
            </Link>
          </div>

          <div className="min-w-[320px] bg-background shadow-sm border border-muted rounded-md p-6">
            <Badge variant="outline">Business</Badge>
            <h3 className="text-4xl font-semibold mt-4 mb-8">$9/month</h3>
            <Separator />
            <div className="mt-8 mb-12 space-y-4">
              <small className="text-muted-foreground">
                Everything in the Pro Plan, plus:
              </small>
              <div className="flex items-center gap-2">
                <CircleCheck size={24} />
                <p>1.000 Links</p>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck size={24} />
                <p>Advanced Analytics</p>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck size={24} />
                <p>Priority Support</p>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck size={24} />
                <p>Customizable URL</p>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck size={24} />
                <p>QR Code Generation</p>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck size={24} />
                <p>Link Expiration</p>
              </div>
            </div>
            <Link href="/billing">
              <Button className="w-full">Get Started</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* <section
        id="testimonials"
        className="w-full py-24 px-8 mx-auto space-y-8 border-x"
      >
        <div className="flex flex-col">
          <h2 className="w-full text-2xl font-bold mb-8">What Our Users Say</h2>
          <div className="max-w-xl text-lg text-muted-foreground">
            <p>
              Hear from our satisfied customers who have experienced the
              benefits of our service.
            </p>
          </div>
        </div>

        <div className="w-full flex flex-wrap items-stretch justify-center gap-6 px-10 pt-8">
          <Carousel
            plugins={[plugin.current]}
            className="w-full h-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {testimonials.map((item, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <div className="h-[320px] flex flex-col gap-8 items-center border border-muted bg-background shadow rounded-md p-6">
                      <div className="self-start flex items-baseline justify-center gap-2">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <small className="text-xs font-medium text-muted-foreground">
                          {item.title}
                        </small>
                      </div>
                      <div className="flex flex-col h-full w-full text-center justify-between">
                        <QuoteIcon
                          size={32}
                          absoluteStrokeWidth
                          className="text-primary"
                        />
                        <div className="px-24 text-center">
                          <p className="text-xl font-semibold">{item.quote}</p>
                        </div>
                        <QuoteIcon
                          size={32}
                          absoluteStrokeWidth
                          className="text-primary self-end"
                        />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section> */}
    </main>
  );
}
