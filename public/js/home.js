$(document).ready(() => {
    // Make new blogs
    var blogName = prompt("Enter the name of the blog:");

    while (blogName === "" || blogName === null) {
        alert("Please enter a valid blog name.");
        blogName = prompt("Enter the name of the blog:");
    }
    var blogs = [{ name: blogName, content: "" }]; // Store blogs as objects with names and content

    function renderBlogs() {
        let html = blogs
            .map(
                (blog, index) => `
            <div class="blogNameHighlight" data-index="${index}">
                <p>${blog.name}</p>
                <img class="trash" src="images/trash.png" alt="Delete" />
            </div>
        `
            )
            .join("");

        $(".names").html(html);
    }

    $(".addBlogButton").click(() => {
        let blogName = prompt("Enter the name of the blog:");
        blogs.push({ name: blogName, content: "" }); // Add new blog
        renderBlogs();
    });

    $(document).on("click", ".blogNameHighlight", function () {
        let index = $(this).data("index");
        $(".textInput").val(blogs[index].content).attr("data-index", index);

        $(".blogNameHighlight").removeClass("selected");
        $(this).addClass("selected");
    });

    $(".textInput").on("input", function () {
        let index = $(this).attr("data-index");
        if (index !== undefined) {
            blogs[index].content = $(this).val();
        }
    });

    renderBlogs();

    // Delete blogs
    $(document).on("click", ".trash", function () {
        let blogElement = $(this).closest(".blogNameHighlight");
        let blogName = blogElement.find("p").text();

        let index = blogs.findIndex((blog) => blog.name === blogName);
        if (index !== undefined) {
            $(`.textInput[data-index="${index}"]`).val(null);
        }

        blogs = blogs.filter((blog) => blog.name !== blogName);

        blogElement.remove();
    });
});
