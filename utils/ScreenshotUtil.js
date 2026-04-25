async function attachTraceOnFailure(page, testInfo) {
  if (testInfo.status !== testInfo.expectedStatus) {
    const tracePath = `./target/traces/${testInfo.title.replace(/\s+/g, '_')}.zip`;
    await page.context().tracing.stop({ path: tracePath });
    await testInfo.attach('trace', {
      path: tracePath,
      contentType: 'application/zip'
    });
  } else {
    await page.context().tracing.stop();
  }
}