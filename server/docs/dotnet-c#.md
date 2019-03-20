## .net 截图方案

相关文章 [Headless Chrome入门](https://www.jianshu.com/p/aec4b1216011)

### Selenium 方式

支持 .Net framework 4.5 

```csharp
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

var options = new ChromeOptions();
options.AddArgument("--headless");
options.AddArgument("--window-size=1080,1920");
//options.AddArguments(new List<string>() { "headless", "screensho", "window-size=1080,1920" });
// var chrome = new ChromeDriver(Path.GetDirectoryName(Assembly.GetEntryAssembly().Location), options);
var chrome = new ChromeDriver(options);
chrome.Url = @"http://192.168.1.222:8081/?id=asd";
ITakesScreenshot screenshotDriver = chrome as ITakesScreenshot;
Screenshot screenshot = screenshotDriver.GetScreenshot();
screenshot.SaveAsFile("./test.png");
chrome.Quit();
```

### PuppeteerSharp 方式

只支持 .Net framework 4.6+

```csharp
await new BrowserFetcher().DownloadAsync(BrowserFetcher.DefaultRevision);

var url = "http://192.168.1.222:8081/?id=asd";
var file = ".\\somepage.jpg";

var launchOptions = new LaunchOptions()
{
    Headless = true
};

using (var browser = await Puppeteer.LaunchAsync(launchOptions))
    //await Page.SetViewport(new ViewPortOptions { Width = 50, Height = 50 });
using (var page = await browser.NewPageAsync())
{
    await page.SetViewportAsync(new ViewPortOptions { Width = 1080, Height = 1920 });
    await page.GoToAsync(url);
    await page.ScreenshotAsync(file);
}
```
