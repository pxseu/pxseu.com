"use client";

import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

const quotes = [
	// Franz Kafka
	"“Many a book is like a key to unknown chambers within the castle of one’s own self.” — Franz Kafka",
	"“Youth is happy because it has the capacity to see beauty. Anyone who keeps the ability to see beauty never grows old.” — Franz Kafka",
	"“In the fight between you and the world, back the world.” — Franz Kafka",
	"“I am a cage, in search of a bird.” — Franz Kafka",
	// temp remove as too long
	// "“Don’t bend; don’t water it down; don’t try to make it logical; don’t edit your own soul according to the fashion. Rather, follow your most intense obsessions mercilessly.” — Franz Kafka",
	"“A book must be the axe for the frozen sea within us.” — Franz Kafka",

	// Friedrich Nietzsche
	"“When you stare into the abyss, the abyss stares back at you.” — Friedrich Nietzsche",
	"“He who has a why to live can bear almost any how.” — Friedrich Nietzsche",
	"“That which does not kill us makes us stronger.” — Friedrich Nietzsche",
	"“Without music, life would be a mistake.” — Friedrich Nietzsche",
	"“In heaven, all the interesting people are missing.” — Friedrich Nietzsche",

	// Fyodor Dostoevsky
	"“The cleverest of all, in my opinion, is the man who calls himself a fool at least once a month.” — Fyodor Dostoevsky",
	"“To go wrong in one's own way is better than to go right in someone else's.” — Fyodor Dostoevsky",
	"“The mystery of human existence lies not in just staying alive, but in finding something to live for.” — Fyodor Dostoevsky",
	"“The soul is healed by being with children.” — Fyodor Dostoevsky",
	"“If you want to overcome the whole world, overcome yourself.” — Fyodor Dostoevsky",

	// Albert Camus
	"“In the depth of winter, I finally learned that within me there lay an invincible summer.” — Albert Camus",

	// Jean-Paul Sartre
	"“Man is condemned to be free.” — Jean-Paul Sartre",

	// Love
	// temp remove as too long
	// "“Love recognizes no barriers. It jumps hurdles, leaps fences, penetrates walls to arrive at its destination full of hope.” — Maya Angelou",
	"“Love is composed of a single soul inhabiting two bodies.” — Aristotle",
	"“Where there is love there is life.” — Mahatma Gandhi",
	"“Let us always meet each other with smile, for the smile is the beginning of love.” — Mother Teresa",

	// Life
	"“In three words I can sum up everything I’ve learned about life: it goes on.” — Robert Frost",
	"“Life is what happens when you’re busy making other plans.” — John Lennon",

	// Anime
	"“In our society, letting others find out that you’re a nice person is a very risky move.” — Hitagi Senjougahara",
	"“No matter how much or how often people hurt each other, loving someone is never a waste.” — Nana Osaki",
	"“Fear is freedom! Subjugation is liberation! Contradiction is truth!” — Satsuki Kiryuin",
	"“No letter that could be sent deserves to go undelivered.” — Violet Evergarden",
	"“I hope one day, that you’ll be reunited with the one you cherish.” — Isla",
	"“Sometimes, kindness leads to even greater tragedy.” — Homura Akemi",
	"“There’s no curse more twisted than love.” — Gojo Satoru",
	"“A man dies when he is forgotten.” — Dr. Hiluluk",

	// Miscellaneous / existing quotes
	"“I don’t have all the answers, but I’m always asking the right questions.” — Unknown",
	"“The only way to do great work is to love what you do.” — Steve Jobs",
	"“The impediment to action advances action. What stands in the way becomes the way.” — Marcus Aurelius",
	"“It does not matter how slowly you go as long as you do not stop.” — Confucius",
	"“The future belongs to those who believe in the beauty of their dreams.” — Eleanor Roosevelt",
	"“Do not go where the path may lead, go instead where there is no path and leave a trail.” — Ralph Waldo Emerson",
	"“Success is not the key to happiness. Happiness is the key to success.” — Albert Schweitzer",
	"“The secret of getting ahead is getting started.” — Mark Twain",
	"“A person who never made a mistake never tried anything new.” — Albert Einstein",
	"“Life is 10% what happens to us and 90% how we react to it.” — Charles R. Swindoll",
];

function getSecureRandomIndex(max: number): number {
	// Check if WebCrypto API is available
	if (
		typeof window !== "undefined" &&
		window.crypto &&
		window.crypto.getRandomValues
	) {
		const maxUint32 = 0xffffffff; // 2^32 - 1

		while (true) {
			// Get one 32-bit random number
			const randomArray = new Uint32Array(1);
			window.crypto.getRandomValues(randomArray);

			const randomValue = randomArray[0];
			// If randomValue is within a multiple of 'max', use it. Otherwise retry.
			// This ensures each index has exactly the same chance (no remainder/bias).
			if (randomValue <= maxUint32 - (maxUint32 % max)) {
				return randomValue % max;
			}
		}
	}

	// Fallback to Math.random() if WebCrypto is not available
	return Math.floor(Math.random() * max);
}

export default function Quote() {
	const [quote, setQuote] = useState("");
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		setQuote(quotes[getSecureRandomIndex(quotes.length)]);
		const animationTimeout = setTimeout(() => setVisible(true), 10);

		return () => {
			clearTimeout(animationTimeout);
		};
	}, []);

	return (
		<div className="min-h-16 transition-all duration-500 ease-out">
			<p
				className={cn(
					"mt-2 border-l border-border-100 pl-3 text-xs leading-relaxed text-zinc-400 transition-all duration-500 ease-out sm:text-sm",
					visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
				)}
			>
				{quote}
			</p>
		</div>
	);
}
