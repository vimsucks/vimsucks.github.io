var jobIntensions = {
    "default": "Java开发工程师实习生",
    "huawei": "IT应用软件开发工程师实习生",
    "cainiao": "研发工程师JAVA实习生",
    "meili": "后端开发实习生",
    "dianwoda": "Java开发实习生",
}
var href = window.location.href;
var url = new URL(href);
var company = url.searchParams.get("company")
if (!(company in jobIntensions)) {
    company = "default"
}
$("h2").text(jobIntensions[company])
