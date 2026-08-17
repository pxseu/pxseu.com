import { default as Image, type StaticImageData } from "next/image";
import { Link } from "../link";
import { Tooltip } from "../tooltip";

export interface JobProps {
	company: string;
	position: string;
	positionTitle?: string;
	start: string;
	end: string;
	url: string;
	image: StaticImageData;
}

export function Job({ company, position, positionTitle, start, end, url, image }: JobProps) {
	return (
		<div className="group flex hit-area-y-1.5">
			<p className="w-25 group-hover:text-zinc-300 text-zinc-600 transition-colors tabular-nums">
				{start} — {end}
			</p>
			<div className="flex items-center gap-1">
				<Link href={url} className="flex items-center gap-1">
					<Image
						className="inline-block size-6 rounded-sm border border-zinc-700/80"
						placeholder="blur"
						preload
						src={image}
						alt=""
					/>
					{company}
				</Link>
				<span className="text-zinc-600">as a</span>{" "}
				{positionTitle ? <Tooltip content={positionTitle}>{position}</Tooltip> : position}
			</div>
		</div>
	);
}
