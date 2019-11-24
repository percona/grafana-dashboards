export declare const getStylesheetEntries: (root?: string) => {
    [key: string]: string;
};
export declare const hasThemeStylesheets: (root?: string) => boolean;
export declare const getStyleLoaders: () => ({
    test: RegExp;
    use: (string | {
        loader: any;
        options: {
            publicPath: string;
        };
    } | {
        loader: string;
        options: {
            importLoaders: number;
            sourceMap: boolean;
            plugins?: undefined;
        };
    } | {
        loader: string;
        options: {
            plugins: () => any[];
            importLoaders?: undefined;
            sourceMap?: undefined;
        };
    })[];
    exclude?: undefined;
} | {
    test: RegExp;
    use: (string | {
        loader: string;
        options: {
            importLoaders: number;
            sourceMap: boolean;
            plugins?: undefined;
        };
    } | {
        loader: string;
        options: {
            plugins: () => any[];
            importLoaders?: undefined;
            sourceMap?: undefined;
        };
    })[];
    exclude: string[];
} | {
    test: RegExp;
    use: ({
        loader: string;
        options: {
            importLoaders: number;
            sourceMap: boolean;
            plugins?: undefined;
        };
    } | {
        loader: string;
        options: {
            plugins: () => any[];
            importLoaders?: undefined;
            sourceMap?: undefined;
        };
    } | {
        loader: string;
        options?: undefined;
    } | {
        loader: string;
        options: {
            javascriptEnabled: boolean;
        };
    })[];
    exclude: string[];
})[];
export declare const getFileLoaders: () => ({
    test: RegExp;
    use: ({
        loader: string;
        options: {
            outputPath: string;
            name: string;
        };
    } | {
        loader: string;
        options?: undefined;
    })[];
    loader?: undefined;
    options?: undefined;
} | {
    test: RegExp;
    loader: string;
    options: {
        publicPath: string;
        outputPath: string;
        name: string;
    };
    use?: undefined;
})[];
