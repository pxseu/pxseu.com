import { type ComponentType, cache } from "react";
import { PageHead } from "@/components/page-head";
import { type PageDefinition, resolvePage } from "./page-metadata";

/** One build-time path for both fixed definitions and async, parameterized pages. */
export function definePage<Props extends object = object>(
	definition: PageDefinition | ((props: Props) => PageDefinition | Promise<PageDefinition>),
) {
	const resolve = cache(async (props: Props) =>
		resolvePage(typeof definition === "function" ? await definition(props) : definition),
	);

	return {
		generateMetadata: async (props: Props) => (await resolve(props)).metadata,
		wrap: (Component: ComponentType<Props>) => {
			return async function PageWithMetadata(props: Props) {
				const page = await resolve(props);
				return (
					<>
						{page.discord ? (
							<PageHead id="discord:component-embed" type="application/json" json={page.discord} />
						) : null}
						{page.jsonLd ? <PageHead id="page-schema" json={page.jsonLd} /> : null}
						<Component {...props} />
					</>
				);
			};
		},
	};
}
