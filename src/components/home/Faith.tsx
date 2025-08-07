"use client";
import React, { useState } from "react";
import { Book, Heart, Cross, Star, ChevronDown, ChevronUp } from "lucide-react";

export default function StatementOfFaith() {
  const [expandedItems, setExpandedItems] = useState(new Set([1]));

  const toggleItem = (index:number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const faithStatements = [
    {
      title: "Scripture",
      icon: <Book className="w-5 h-5" />,
      statement:
        "We believe the Bible, in its original autographs, to be the inspired, only infallible, authoritative Word of God.",
      reference: "(Psalm 12:6; John 17:17; 2 Timothy 3:16–17; 2 Peter 1:20–21)",
    },
    {
      title: "Trinity",
      icon: <Star className="w-5 h-5" />,
      statement:
        "We believe that there is one God, eternally existent in three co-equal persons: Father, Son, and Holy Spirit, one in nature, attributes, and glory.",
      reference:
        "(Isaiah 45:5; Matthew 28:19; 1 Corinthians 12:4–6; 2 Corinthians 3:17, 13:14; Galatians 4:4–6; 1 Peter 1:2; Jude 20–21)",
    },
    {
      title: "Jesus Christ",
      icon: <Cross className="w-5 h-5" />,
      statement:
        "We believe in the deity of the Lord Jesus Christ, in His virgin birth, in His sinless humanity, in His miracles, in His vicarious and atoning death through His shed blood, in His bodily resurrection, in His ascension to the right hand of the Father, and in His personal return in power and glory.",
      reference:
        "(Matthew 1:18–25, 4:23–25; Luke 5:12–15, 24:1–8; John 1:1–4, 14; 8:54–58; Acts 1:3–9; Romans 8:1–2; 1 Corinthians 15:3–20; 2 Corinthians 5:20–21; Colossians 2:9; 1 Thessalonians 4:14–17)",
    },
    {
      title: "Salvation",
      icon: <Heart className="w-5 h-5" />,
      statement:
        "We believe that for the salvation of lost and sinful people, faith and trust in Jesus Christ and regeneration by the Holy Spirit is absolutely essential.",
      reference: "(John 3:3–8; Romans 8:5–9; Titus 3:3–7)",
    },
    {
      title: "Holy Spirit",
      icon: <Star className="w-5 h-5" />,
      statement:
        "We believe in the present ministry of the Holy Spirit by whose indwelling the Christian is enabled to live a godly life.",
      reference: "(John 16:7–15; Galatians 5:13–25; 1 Peter 1:1–2)",
    },
    {
      title: "Resurrection",
      icon: <Cross className="w-5 h-5" />,
      statement:
        "We believe in the resurrection of both the saved and the lost: they that are saved unto the resurrection of eternal life and they that are lost unto the resurrection of eternal damnation.",
      reference:
        "(Matthew 25:31–46; 1 Corinthians 15:35–44; Revelation 20:11–15)",
    },
    {
      title: "Unity of Believers",
      icon: <Heart className="w-5 h-5" />,
      statement:
        "We believe in the spiritual unity of believers in our Lord Jesus Christ.",
      reference:
        "(John 17:20–23; 1 Corinthians 12:12–26; Ephesians 2:1–22, 4:3–6)",
    },
    {
      title: "Human Sexuality",
      icon: <Book className="w-5 h-5" />,
      statement:
        "We believe that human sexuality is a gift from God and that: each person is wonderfully and immutably created as male or female; that marriage is a sacred covenant between one biological male and one biological female; and that sexual relations are to be exclusively expressed within biblical marriage.",
      reference:
        "(Genesis 1:26–28, 2:18–24; Proverbs 5:1–23; Matthew 19:3–6; Romans 1:18–27)",
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
            Statement of Faith
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
            What we believe
          </p>
        </div>

        {/* Faith Statements */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faithStatements.map((item, index) => {
            const isExpanded = expandedItems.has(index + 1);
            return (
              <div
                key={index}
                className="bg-blue-800/30 backdrop-blur-sm border border-yellow-400/20 rounded-xl overflow-hidden transition-all duration-300 hover:border-yellow-400/40"
              >
                <button
                  onClick={() => toggleItem(index + 1)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-blue-700/20 transition-colors duration-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center text-blue-900">
                      {item.icon}
                    </div>
                    <div>
                      <span className="text-yellow-400 font-semibold text-sm">
                        {index + 1}.
                      </span>
                      <h3 className="text-lg sm:text-xl font-semibold text-white ml-2">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <div className="text-yellow-400">
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
                    <div className="ml-14 space-y-4">
                      <p className="text-blue-100 leading-relaxed text-base sm:text-lg">
                        {item.statement}
                      </p>
                      <p className="text-yellow-300/80 text-sm italic">
                        {item.reference}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom decorative section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-800/50 backdrop-blur-sm border border-yellow-400/20 px-6 py-3 rounded-full">
            <Heart className="w-4 h-4 text-yellow-400" />
            <span className="text-blue-100 text-sm sm:text-base">
              Founded on Scripture, Centered on Christ
            </span>
          </div>
        </div>
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none"></div>
    </div>
  );
}
