"use client";

import { useState, useEffect } from "react";

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
	"“Love recognizes no barriers. It jumps hurdles, leaps fences, penetrates walls to arrive at its destination full of hope.” — Maya Angelou",
	"“Love is composed of a single soul inhabiting two bodies.” — Aristotle",
	"“You know you’re in love when you can’t fall asleep because reality is finally better than your dreams.” — Dr. Seuss",
	"“Let us always meet each other with smile, for the smile is the beginning of love.” — Mother Teresa",

	// Life
	"“In three words I can sum up everything I’ve learned about life: it goes on.” — Robert Frost",
	"“Life is what happens when you’re busy making other plans.” — John Lennon",

	// Miscellaneous / existing quotes
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
	const [quote, setQuote] = useState<string>("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		let mounted = true;

		const index = getSecureRandomIndex(quotes.length);
		setQuote(quotes[index]);
		setTimeout(() => mounted && setVisible(true), 10);

		return () => {
			mounted = false;
		};
	}, []);

	return (
		<div className="transition-all duration-500 ease-out">
			<p
				className={`mt-2 italic text-sm text-muted-foreground transition-all duration-500 ease-out ${
					visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
				}`}
			>
				{quote}
			</p>
		</div>
	);
}
