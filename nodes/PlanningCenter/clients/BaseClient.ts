// BaseClient.ts: This is the core client class that handles HTTP requests and pagination.
// It extends the functionality from client.py, but uses a passed-in 'request' function instead of 'requests' library.
// The 'request' function is expected to handle authentication and return JSON responses (or throw on error).
// Full URL construction, response handling, and pagination are mirrored from Python.

export class BaseClient {
    // Constructor takes the base path (e.g., 'people/v2') and a request function.
    // The request function signature: async (method: string, url: string, body?: any, qs?: any) => Promise<any>
    constructor(public base: string, public request: (method: string, url: string, body?: any, qs?: any) => Promise<any>) {}

    // Helper to build full API URL. Mirrors _full_url in Python.
    // If URL is already absolute (starts with 'http'), return it; otherwise, prepend the base API URL.
    fullUrl(url: string): string {
        if (url.startsWith('http')) {
            return url;
        }
        return `https://api.planningcenteronline.com/${this.base}/${url.replace(/^\//, '')}`;
    }

    // GET request. Calls the provided request function with method 'GET' and params as query string.
    // Returns the JSON response. Assumes request throws on non-2xx status.
    async get(url: string, params?: any): Promise<any> {
        return await this.request('GET', this.fullUrl(url), undefined, params);
    }

    // POST request. Sends JSON body.
    // Returns the JSON response.
    async post(url: string, data: any): Promise<any> {
        return await this.request('POST', this.fullUrl(url), data);
    }

    // PATCH request for updates. Sends JSON body.
    // Returns the JSON response.
    async patch(url: string, data: any): Promise<any> {
        return await this.request('PATCH', this.fullUrl(url), data);
    }

    // DELETE request. No body.
    // Returns null on success (mirrors Python handling for 204 status).
    async delete(url: string): Promise<any> {
        await this.request('DELETE', this.fullUrl(url));
        return null;
    }

    // Pagination helper to fetch all pages. Mirrors paginate_get in Python.
    // Starts with per_page=100 for efficiency. Follows 'links.next' until no more pages.
    // Extracts data from the specified key (default 'data'). Adds 200ms delay between requests for rate limiting (~5 req/sec).
    async paginateGet(url: string, params?: any, extractKey = 'data'): Promise<any[]> {
        const results: any[] = [];
        let currentUrl = url;
        let currentParams = params ? { ...params, per_page: 100 } : { per_page: 100 };
        while (currentUrl) {
            const data = await this.get(currentUrl, currentParams);
            results.push(...(data[extractKey] || []));
            currentUrl = data.links?.next || '';
            currentParams = undefined; // Subsequent URLs include params from API
            if (currentUrl) {
                await new Promise(resolve => setTimeout(resolve, 200));
            }
        }
        return results;
    }
}
