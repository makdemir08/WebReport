using DevExpress.AspNetCore;
using DevExpress.XtraCharts;
using DevExpress.XtraReports.Web.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


//-----------------
builder.Services.AddDevExpressControls();
builder.Services.AddMvc().ConfigureApplicationPartManager(x => {
    var parts = x.ApplicationParts;
    var aspNetCoreReportingAssemblyName = typeof(DevExpress.AspNetCore.Reporting.WebDocumentViewer.WebDocumentViewerController).Assembly.GetName().Name;
    var reportingPart = parts.FirstOrDefault(part => part.Name == aspNetCoreReportingAssemblyName);
    if (reportingPart != null)
    {
        parts.Remove(reportingPart);
    }
});
//-----------------
//...
builder.Services.AddCors(options => {
    options.AddPolicy("AllowCorsPolicy", builder => {
        // Allow all ports on local host.
        builder.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost");
        builder.AllowAnyHeader();
        builder.AllowAnyMethod();
    });
});
//...


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ...
app.UseRouting();
// ...
app.UseCors("AllowCorsPolicy");
// ...
app.UseEndpoints(endpoints => {
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Index}/{id?}");
});

app.UseHttpsRedirection();

app.UseAuthorization();



app.MapControllers();

//-----------------
// Initialize reporting services.
app.UseDevExpressControls();
//-----------------

app.Run();
