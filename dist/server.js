"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ytmusic_api_1 = __importDefault(require("ytmusic-api"));
function handleNextYtSong(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const ytmusic = new ytmusic_api_1.default();
        yield ytmusic.initialize( /* Optional: Custom cookies */);
        return ytmusic.searchSongs(query); // Use search method instead of searchSongs if available
    });
}
const app = (0, express_1.default)();
const port = 8080;
app.use(express_1.default.json());
// Enable CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
// Example endpoint to proxy requests to YouTube Music API
app.get('/api/ytmusic', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.q; // Assuming the query parameter is named 'q'
    console.log(query);
    if (!query) {
        return res.status(400).json({ error: 'Query parameter "q" is required' });
    }
    try {
        const response = yield handleNextYtSong(query);
        console.log(response);
        res.json(response); // Send the response back to the client
    }
    catch (error) {
        console.error('Error calling YouTube Music API:', error.message);
        res.status(500).json({ error: 'Failed to fetch data from YouTube Music API' });
    }
}));
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});