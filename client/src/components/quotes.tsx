"use client";
import { useState, useEffect } from "react";

const quotes = [
	"“I don’t have all the answers, but I’m always asking the right questions.”",
	"“The only way to do great work is to love what you do.” — Steve Jobs",
	"“Simplicity is the ultimate sophistication.” — Leonardo da Vinci",
	"“It does not matter how slowly you go as long as you do not stop.” — Confucius",
	"“The future belongs to those who believe in the beauty of their dreams.” — Eleanor Roosevelt",
	"“Do not go where the path may lead, go instead where there is no path and leave a trail.” — Ralph Waldo Emerson",
	"“Success is not the key to happiness. Happiness is the key to success.” — Albert Schweitzer",
	"“The secret of getting ahead is getting started.” — Mark Twain",
	"“You must be the change you wish to see in the world.” — Mahatma Gandhi",
	"“A person who never made a mistake never tried anything new.” — Albert Einstein",
	"“Life is 10% what happens to us and 90% how we react to it.” — Charles R. Swindoll",
];

function getSecureRandomIndex(max: number): number {
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

export default function Quote() {
	const [quote, setQuote] = useState<string>("");

	useEffect(() => {
		const index = getSecureRandomIndex(quotes.length);
		setQuote(quotes[index]);
	}, []);

	if (!quote) {
		return (
			<p className="mt-4 italic text-sm text-muted-foreground">
				<span className="w-1/2 h-3 bg-gray-900 animate-pulse inline-block"></span>
			</p>
		);
	}

	return <p className="mt-4 italic text-sm text-muted-foreground">{quote}</p>;
}
