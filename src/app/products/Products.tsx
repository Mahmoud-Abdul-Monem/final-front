export async function getProducts() {
    try {
        const res = await fetch("http://localhost:1337/api/products", {
            next: { revalidate: 3600 },
        });
        if (!res.ok) {
            throw new Error(`Failed to fetch products: ${res.statusText}`);
        }
        return await res.json();
    } catch (error) {
        console.error("Error fetching products:", error);
        return null;
    }
}

export default async function Products() {
    const data = await getProducts();

    return (
        <section className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            {data ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Array.isArray(data?.data) ? (
                        data.data.map((item: any) => (
                            <div key={item.id} className="p-4 rounded-xl border border-gray-200 dark:border-gray-800">
                                <h3 className="font-semibold">{item.attributes?.name || item.name}</h3>
                                <p className="text-gray-500">${item.attributes?.price || item.price}</p>
                            </div>
                        ))
                    ) : (
                        <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-auto col-span-full">
                            {JSON.stringify(data, null, 2)}
                        </pre>
                    )}
                </div>
            ) : (
                <p className="text-gray-500">No products available at the moment.</p>
            )}
        </section>
    );
}

export { Products };
