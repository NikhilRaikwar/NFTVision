"use client"


import { Layout } from "@/components/layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Github, Globe } from "lucide-react"
import Image from "next/image"

export default function ContactPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
        <Card className="max-w-3xl mx-auto">
          <CardContent className="space-y-6 pt-6">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-64 h-64 relative rounded-full overflow-hidden border-4 border-purple-500">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/70462831-OPtzHI4eMAPbuQUZXUpcYA6dnmMdKP.jpeg"
                  alt="Nikhil Raikwar"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold mb-2">Nikhil Raikwar</h2>
                <p className="text-xl mb-2">Full Stack Web3/AI Developer</p>
                <p className="text-muted-foreground mb-6">
                  Passionate about creating innovative solutions in Web3 and AI technology. Specialized in building
                  user-friendly applications that make a difference in people's lives. Always eager to collaborate on
                  open-source projects and explore new technologies.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                  <Button
                    variant="outline"
                    onClick={() => window.open("mailto:raikwarnikhil16@gmail.com")}
                    className="flex items-center"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.open("https://github.com/NikhilRaikwar", "_blank")}
                    className="flex items-center"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub Profile
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.open("https://nikhilraikwar.vercel.app/", "_blank")}
                    className="flex items-center"
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    Portfolio
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-8 p-4 bg-muted rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Let's Connect!</h3>
              <p>
                Whether you're interested in discussing Web3 development, AI integration, or potential collaborations,
                I'm always open to connecting with fellow developers and technology enthusiasts. Feel free to reach out
                through any of the channels above.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

