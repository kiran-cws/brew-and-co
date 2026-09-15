import type { StaticImageData } from "next/image";
import singleEspresso from "@/public/images/menu/single-espresso.webp";
import doubleEspresso from "@/public/images/menu/double-espresso.webp";
import ristretto from "@/public/images/menu/ristretto.webp";
import macchiato from "@/public/images/menu/macchiato.webp";
import flatWhite from "@/public/images/menu/flat-white.webp";
import cappuccino from "@/public/images/menu/cappuccino.webp";
import oatLatte from "@/public/images/menu/oat-latte.webp";
import mochaFix from "@/public/images/menu/mocha-fix.webp";
import cortado from "@/public/images/menu/cortado.webp";
import butterCroissant from "@/public/images/menu/butter-croissant.webp";
import almondCroissant from "@/public/images/menu/almond-croissant.webp";
import cardamomBun from "@/public/images/menu/cardamom-bun.webp";
import bananaBread from "@/public/images/menu/banana-bread.webp";
import baconAndEggRoll from "@/public/images/menu/bacon-and-egg-roll.webp";
import turkeyAndBrie from "@/public/images/menu/turkey-and-brie.webp";
import roastVegetableFocaccia from "@/public/images/menu/roast-vegetable-focaccia.webp";
import coldBrew from "@/public/images/menu/cold-brew.webp";
import oatColdBrew from "@/public/images/menu/oat-cold-brew.webp";
import coldBrewTonic from "@/public/images/menu/cold-brew-tonic.webp";
import icedMatchaLatte from "@/public/images/menu/iced-matcha-latte.webp";
import type { MenuSlug } from "@/lib/menu";

/** Static imports so next/image knows each photo's size and can blur-up. */
export const menuImages: Record<MenuSlug, StaticImageData> = {
  "single-espresso": singleEspresso,
  "double-espresso": doubleEspresso,
  ristretto,
  macchiato,
  "flat-white": flatWhite,
  cappuccino,
  "oat-latte": oatLatte,
  "mocha-fix": mochaFix,
  cortado,
  "butter-croissant": butterCroissant,
  "almond-croissant": almondCroissant,
  "cardamom-bun": cardamomBun,
  "banana-bread": bananaBread,
  "bacon-and-egg-roll": baconAndEggRoll,
  "turkey-and-brie": turkeyAndBrie,
  "roast-vegetable-focaccia": roastVegetableFocaccia,
  "cold-brew": coldBrew,
  "oat-cold-brew": oatColdBrew,
  "cold-brew-tonic": coldBrewTonic,
  "iced-matcha-latte": icedMatchaLatte,
};
