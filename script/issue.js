const buttons = document.querySelectorAll(".btn");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const activeBtn = document.querySelector(".btn.active");
        if (activeBtn) {
            activeBtn.classList.remove("active")
        };
        button.classList.add("active");
    });
});
let allIssues = [];
const loadAIssue = async () => {
    mangeSpinner(true);
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await res.json();
    allIssues = data.data;
    document.getElementById('issue-count').innerText = allIssues.length + " " + "Issues";
    displayIssues(allIssues);
    mangeSpinner(false);
}
const showOpen = () => {
    mangeSpinner(true);
    const openIssues = allIssues.filter(issue => issue.status === "open");
    document.getElementById('issue-count').innerText = openIssues.length + " " + "Issues";
    displayIssues(openIssues);
    mangeSpinner(false);
}
const showClosed = () => {
    mangeSpinner(true);
    const closedIssue = allIssues.filter(issue => issue.status === "closed");
    document.getElementById('issue-count').innerText = closedIssue.length + " " + "Issues";
    displayIssues(closedIssue);
    mangeSpinner(false);
}
const displayIssues = (issues) => {
    const issueContainer = document.getElementById("issue-container");
    issueContainer.innerHTML = "";
    issues.forEach(issue => {
        const borderColor = issue.status === 'open' ? "border-[#00A96E]" : "border-[#A855F7]";
        const priorityColor = issue.priority === 'high' ? "bg-red-100 text-red-600" : issue.priority === 'medium' ? "bg-yellow-100 text-yellow-600" : "bg-[#EEEFF2] text-[#9CA3AF]";
        const cardDiv = document.createElement('div');
        let labelsHTML = "";
        issue.labels.forEach((label, index) => {
            const badgeClass = index === 0
                ? "badge-soft badge-error border border-error rounded-full px-2"
                : "badge-soft badge-warning border border-warning rounded-full px-2";
            const icon = index === 0
                ? '<i class="fa-solid fa-bug"></i>'
                : '<i class="fa-regular fa-life-ring"></i>';

            labelsHTML += `<div class="${badgeClass}">${icon} ${label}</div>`;
        });
        cardDiv.innerHTML = `
        <div id="card_details" onclick="loadDisplayModal(${issue.id})" class="border-t-4 bg-white ${borderColor} min-h-[400px] rounded-2xl shadow">
            <div class="space-y-5 p-4">
                <div class="flex justify-between">
                    <img src="assets/Open-Status.png" alt="" srcset="">
                    <div class="badge badge-soft ${priorityColor} ">${issue.priority}</div>
                </div>
                <h2 class="font-bold text-2xl">${issue.title}</h2>
                <p>${issue.description}</p>
                <div class="flex gap-2">
                ${labelsHTML}
                </div>
            </div>
            <hr class="text-[#EFEFEF]">
            <div class="p-4">
                <p># ${issue.id} by ${issue.assignee ? issue.assignee : "assignee not found"}</p>
                <p>${issue.updatedAt}</p>
            </div>
        </div>
        `;
        issueContainer.appendChild(cardDiv);
    });
}

const loadDisplayModal = async (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    const issue = data.data;
    const priorityColor = issue.priority === 'high' ? "bg-red-100 text-red-600" : issue.priority === 'medium' ? "bg-yellow-100 text-yellow-600" : "bg-[#EEEFF2] text-[#9CA3AF]";
    const loadModal = document.getElementById('load-modal');
    loadModal.innerHTML = `
        <div class="space-y-5  p-5">
        <h2 class="font-bold text-xl">${issue.title}</h2>
        <div class="flex gap-2">
            <div class="badge badge-success text-white">${issue.status}</div>
            <p class="text-[#64748B]"> • Opened by ${issue.author} • ${issue.updatedAt}</p>
        </div>
        <div class="flex gap-2">
            <div class="badge badge-soft badge-error border border-error"><i class="fa-solid fa-bug"></i> Bug</div>
            <div class="badge badge-soft badge-warning border border-warning">help wanted</div>
        </div>
        <p>${issue.description}</p>
        <div class="bg-[#F8FAFC] p-10 flex">
            <div class="flex-1">
                <p class="text-[#64748B]">Assigne:</p>
                <h3 class="font-bold">${issue.assignee ? issue.assignee : "Assignee Not Found"}</h3>
            </div>
            <div>
                <p class="text-[#64748B]">Priority::</p>
                <div class="badge badge-soft  ${priorityColor}">${issue.priority}</div>
            </div>
        </div>
    </div>

    `;
    document.getElementById('my_modal_5').showModal();
}
const searchIssues = async () => {
    const inputValue = document.getElementById('input-search').value;
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${inputValue}`);
    const data = await res.json();
    displayIssues(data.data);
    document.getElementById('issue-count').innerText = `${data.data.length}` + " " + "Issues";
}
const mangeSpinner = (status) => {
    if (status == true) {
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('issue-container').classList.add('hidden');
    }
    else {
        document.getElementById('spinner').classList.add('hidden');
        document.getElementById('issue-container').classList.remove('hidden');
    }
}
loadAIssue();