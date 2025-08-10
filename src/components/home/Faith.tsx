"use client";
import React from "react";
import { Book, Heart, Cross, Star } from "lucide-react";

export default function ApostolicCreed() {
  const creedStatements = [
    {
      title: "The Holy Scriptures",
      icon: <Book className="w-5 h-5" />,
      statement:
        "We believe in the Holy Scriptures as the inspired, inerrant, and authoritative Word of God, the only infallible rule of faith and practice, containing all things necessary for salvation and godly living.",
      reference:
        "(2 Timothy 3:16-17; 2 Peter 1:20-21; Psalm 119:160; John 17:17)",
    },
    {
      title: "The Triune God",
      icon: <Star className="w-5 h-5" />,
      statement:
        "We believe in one God, eternally existing in three persons: Father, Son, and Holy Spirit, co-equal in power and glory, of one substance and nature, the Maker and Preserver of all things visible and invisible.",
      reference: "(Deuteronomy 6:4; Matthew 28:19; 2 Corinthians 13:14)",
    },
    {
      title: "God the Father",
      icon: <Star className="w-5 h-5" />,
      statement:
        "We believe in God the Father Almighty, Creator of heaven and earth, perfect in holiness, infinite in wisdom, measureless in power, who concerns Himself mercifully in the affairs of men, hears and answers prayer, and saves from sin and death all who come to Him through Jesus Christ.",
      reference: "(Genesis 1:1; Psalm 145:8-9; John 3:16; 1 Peter 1:15-16)",
    },
    {
      title: "Jesus Christ",
      icon: <Cross className="w-5 h-5" />,
      statement:
        "We believe in Jesus Christ, God's only begotten Son, conceived by the Holy Spirit, born of the Virgin Mary; who suffered under Pontius Pilate, was crucified, died, and was buried; He descended into Hades; the third day He rose again from the dead; He ascended into heaven and sits at the right hand of God the Father Almighty; from thence He shall come to judge the living and the dead.",
      reference:
        "(Matthew 1:18-25; John 1:1-14; Acts 2:22-36; 1 Corinthians 15:3-8)",
    },
    {
      title: "The Holy Spirit",
      icon: <Star className="w-5 h-5" />,
      statement:
        "We believe in the Holy Spirit, the Lord and Giver of life, who proceeds from the Father and the Son; who with the Father and the Son together is worshiped and glorified; who convicts the world of sin, righteousness, and judgment; who regenerates, sanctifies, baptizes, indwells, seals, and empowers believers for godly living and service.",
      reference: "(John 14:16-17; Acts 1:8; Romans 8:9-11; Ephesians 1:13-14)",
    },
    {
      title: "The Church",
      icon: <Heart className="w-5 h-5" />,
      statement:
        "We believe in one holy, catholic, and apostolic Church, the communion of saints, the body and bride of Christ, built upon the foundation of the apostles and prophets, Jesus Christ Himself being the chief cornerstone.",
      reference: "(Matthew 16:18; Ephesians 2:19-22; 5:25-27; Colossians 1:18)",
    },
    {
      title: "The Ordinances",
      icon: <Cross className="w-5 h-5" />,
      statement:
        "We believe Christ instituted the ordinances of Baptism and the Lord's Supper, which are to be observed by the Church until His return. Baptism signifies union with Christ in His death and resurrection, and the Lord's Supper proclaims His death until He comes.",
      reference: "(Matthew 28:19; Acts 2:38; 1 Corinthians 11:23-26)",
    },
    {
      title: "The Last Things",
      icon: <Cross className="w-5 h-5" />,
      statement:
        "We believe in the personal, visible return of our Lord Jesus Christ in glory to judge the living and the dead; the resurrection of the body; the eternal blessedness of the righteous in the presence of God; and the eternal punishment of the wicked.",
      reference: "(1 Thessalonians 4:13-18; Revelation 20:11-15; 21:1-8)",
    },
    {
      title: "Salvation",
      icon: <Heart className="w-5 h-5" />,
      statement:
        "We believe all have sinned and fall short of God's glory, and are justified freely by His grace through the redemption that is in Christ Jesus, through faith in His atoning blood, apart from works of the law. This salvation results in holiness and good works as the fruit of faith.",
      reference: "(Romans 3:23-26; Ephesians 2:8-10; Titus 3:4-7)",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-yellow-300 rounded-full animate-ping opacity-40"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-yellow-500 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute top-60 left-1/3 w-1 h-1 bg-yellow-400 rounded-full animate-ping opacity-30"></div>
        <div className="absolute bottom-20 right-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-pulse opacity-40"></div>
      </div>

      <div className="relative z-10 px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-400 blur-xl opacity-30 rounded-full"></div>
              <Book className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400 relative z-10" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent mb-4">
            The Apostolic Faith
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
            As handed down by the Apostles and preserved in Holy Scripture
          </p>
        </div>

        {/* Creed Statements */}
        <div className="max-w-4xl mx-auto space-y-6">
          {creedStatements.map((item, index) => (
            <div
              key={index}
              className="bg-blue-800/30 backdrop-blur-sm border border-yellow-400/20 rounded-xl p-6 transition-all duration-300 hover:border-yellow-400/40"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center text-blue-900">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-blue-100 leading-relaxed text-base sm:text-lg mb-2">
                    {item.statement}
                  </p>
                  <p className="text-yellow-300/80 text-sm italic">
                    {item.reference}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Conclusion */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-800/50 backdrop-blur-sm border border-yellow-400/20 px-6 py-3 rounded-full">
            <Heart className="w-4 h-4 text-yellow-400" />
            <span className="text-blue-100 text-sm sm:text-base">
              "Therefore, brethren, stand fast, and hold the traditions which ye
              have been taught..." (2 Thessalonians 2:15)
            </span>
          </div>
        </div>
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none"></div>
    </div>
  );
}
