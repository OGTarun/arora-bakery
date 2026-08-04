"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { products } from "@/data/site";
import { cn } from "@/lib/utils";

export function FeaturedProducts() {
  return (
    <section
      id="products"
      className="py-20 md:py-28 lg:py-36 bg-background"
      aria-labelledby="products-title"
    >
      <Container>
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <p className="mb-4 text-lg font-medium text-primary tracking-wide uppercase">
            Our Creations
          </p>
          <h2
            id="products-title"
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-foreground tracking-tight text-balance"
          >
            Featured Products
          </h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            Each creation is baked fresh daily using time-honored recipes and the finest ingredients.
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          role="list"
          aria-label="Featured products"
        >
          {products.map((product) => (
            <article
              key={product.id}
              className="group"
              role="listitem"
            >
              <Link
                href={`/products/${product.id}`}
                className="block h-full"
                aria-label={`View ${product.name}`}
              >
                <Card className="h-full overflow-hidden bg-transparent border-0 shadow-none">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardContent className="p-6 pt-4">
                    <h3 className="font-heading text-xl font-medium text-foreground mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <Button variant="ghost" size="sm" className="w-full justify-start px-0">
                      View Details
                      <svg
                        className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}