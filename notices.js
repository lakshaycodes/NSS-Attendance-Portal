document.addEventListener("DOMContentLoaded", function() {
    const noticeTextElement = document.getElementById('latest-notices');
    const notices = [
        {
            date: "27-08-2024",
            title: "NSS Credit Course Event-Work Hour List",
            link: "https://www.imsnsit.org/imsnsit/plum_url.php?Hgd27dEuhTr47fEWNZVTwmc5ITvg0OXExIzOfm2Cuw8aW0+myDR9qsyf1yHxJBPdmRJvf3rXLP51u3Fx1ea515jIKgcfgjUHO838rVnseH3eSpZEHTO/XvdfH4hOOslwITRY9vr+Wt/GLDGZkykeSTDzFMlcLuzffzpa6Yo6+GxtQT34k3UL/qfhyL7A6f+3Gcpub7Mn8nsb6NORKqwyYEl+5Nb6ijJmREhQLBBSSq0="
        },
        {
            date: "28-06-2024",
            title: "Community Internship Course NSS- Important Information",
            link: "https://www.imsnsit.org/imsnsit/plum_url.php?EPt3QcP3Obn8NhGQGI9Kxi9onikN7bpXct39PEQuqmzSnsX9gvtEzJPl0bPM32evmpIdMp+acV32oPgHT0pkSXyWcOOLYdpzZ57rTH3dIWuwny8Olt1TCcyZNGhPnzzpU1zYVm+gRqQZbRIyCLWOUgqzjPnZuwt+3oZR64b2tgvuCeJ/fmhsMnHiI3nHFTXIxpfb/GA+wL1ozS0Us55H5ogkM+URVz0O2aov75D9g9Y="
        }
    ];

    // Create dynamic content for the notice bar
    notices.forEach((notice, index) => {
        if (index < 2) { // Only take the top 2 notices
            const noticeLink = document.createElement('a');
            noticeLink.href = notice.link;
            noticeLink.target = "_blank";
            noticeLink.classList.add('notice-link');
            noticeLink.textContent = `${notice.title} (${notice.date})`;

            noticeTextElement.appendChild(noticeLink);
            if (index < 1) { // Add a separator after the first notice
                noticeTextElement.appendChild(document.createTextNode(' | '));
            }
        }
    });
});
