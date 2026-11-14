#!/usr/bin/env node
/**
 * Automated SEO Ping & Real-Time Search Engine Indexing Script
 * Submits sitemap and homepage to:
 * 1. Microsoft Bing & IndexNow Engine (Instant Indexing)
 * 2. Google Search Console Sitemap Ping
 * 3. Bing Webmaster Sitemap Ping
 */

const https = require('https');

const HOST = 'my-portfolio-one-cyan-rlqanq9j8c.vercel.app';
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const INDEXNOW_KEY = 'b65471d8718a4a58b871c8282361ef56';
const KEY_LOCATION = `https://${HOST}/b65471d8718a4a58b871c8282361ef56.txt`;

const URLS_TO_INDEX = [
  `https://${HOST}/`,
  `https://${HOST}/about`,
  `https://${HOST}/skills`,
  `https://${HOST}/projects`,
  `https://${HOST}/insights`,
  `https://${HOST}/contact`,
  `https://${HOST}/privacy`,
  `https://${HOST}/terms`,
  `https://${HOST}/sitemap.xml`
];

function sendHttpRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, data });
      });
    });

    req.on('error', (e) => reject(e));

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

async function submitIndexNow() {
  console.log('🚀 [1/3] Submitting homepage & routes to IndexNow API (Bing / Yandex / Naver)...');
  const payload = JSON.stringify({
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: URLS_TO_INDEX
  });

  const options = {
    hostname: 'api.indexnow.org',
    port: 443,
    path: '/IndexNow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  try {
    const res = await sendHttpRequest(options, payload);
    console.log(`   ✓ IndexNow Response: HTTP ${res.statusCode} (Submitted ${URLS_TO_INDEX.length} URLs)`);
  } catch (err) {
    console.warn(`   ! IndexNow submission warning: ${err.message}`);
  }
}

async function pingGoogleSitemap() {
  console.log('📡 [2/3] Submitting sitemap to Google Search Console ping endpoint...');
  const options = {
    hostname: 'www.google.com',
    port: 443,
    path: `/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
    method: 'GET'
  };

  try {
    const res = await sendHttpRequest(options);
    console.log(`   ✓ Google Ping Response: HTTP ${res.statusCode}`);
  } catch (err) {
    console.warn(`   ! Google ping warning: ${err.message}`);
  }
}

async function pingBingSitemap() {
  console.log('📡 [3/3] Submitting sitemap to Bing Webmaster Tools ping endpoint...');
  const options = {
    hostname: 'www.bing.com',
    port: 443,
    path: `/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
    method: 'GET'
  };

  try {
    const res = await sendHttpRequest(options);
    console.log(`   ✓ Bing Ping Response: HTTP ${res.statusCode}`);
  } catch (err) {
    console.warn(`   ! Bing ping warning: ${err.message}`);
  }
}

async function run() {
  console.log('====================================================');
  console.log('   PRATHAM PANCHAL PORTFOLIO — AUTOMATED SEO INDEXER');
  console.log('====================================================');
  await submitIndexNow();
  await pingGoogleSitemap();
  await pingBingSitemap();
  console.log('====================================================');
  console.log('✓ All search engine indexing requests completed in code!');
}

if (require.main === module) {
  run().catch(console.error);
}

module.exports = { run, submitIndexNow, pingGoogleSitemap, pingBingSitemap };
