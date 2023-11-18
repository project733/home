import React, { useEffect, useRef } from "react";
import projects from "./project_tiles";

import "../../css/global.scss";
import styles from "./ProjectsList.module.scss";

function Projects() {
  // Initial set LI attributes
  const addARIA = () => {
    const projectLIs = document.querySelectorAll("#projects > li");
    const projectAHREFs = document.querySelectorAll(".details a");
    for (let i = 0; i < projectLIs.length; i++) {
      projectLIs[i].setAttribute("aria-expanded", false);
      projectLIs[i].setAttribute("role", "listitem");
      for (let j = 0; j < projectAHREFs.length; j++) {
        projectAHREFs[j].tabIndex = -1;
        projectAHREFs[j].setAttribute("aria-hidden", true);
      }
    }
  };
  useEffect(() => {
    addARIA();
  });

  const divRef = useRef(null);

  // CLICK handler OPEN
  const toggleOpen = (e) => {
    if (!e.currentTarget.classList.contains("open")) {
      // Scroll into view when tile opens
      divRef.current.scrollIntoView({ top: 0, behavior: "smooth" });
      // Reset all LIs in case residual "open" class exist and removes tabindex=0
      const sections = document.querySelectorAll("#projects > li");
      for (let i = 0; i < sections.length; i++) {
        sections[i].classList.remove("open");
        sections[i].classList.add("closed");
        sections[i].removeAttribute("tabindex");
      }
      // Set active state for current LI
      e.currentTarget.classList.remove("closed");
      e.currentTarget.classList.add("open");
      e.currentTarget.setAttribute("tabindex", 0);
      e.currentTarget.setAttribute("aria-expanded", true);
      // Set .details block active so it is readable via screenreaders
      e.currentTarget
        .querySelector(".details")
        .setAttribute("aria-hidden", false);
      // Set screenshots active so they are readable via screenreaders
      const screenContainer = e.currentTarget.querySelector(".js-screenshots");
      screenContainer.setAttribute("aria-hidden", false);
      const screens = e.currentTarget.querySelectorAll(".js-screenshots img");
      for (let i = 0; i < screens.length; i++) {
        screens[i].setAttribute("aria-hidden", false);
      }
      // set links active so they are readable via screenreaders
      const links = e.currentTarget.querySelectorAll(".details a");
      for (let j = 0; j < links.length; j++) {
        links[j].removeAttribute("tabindex");
        links[j].setAttribute("aria-hidden", false);
      }
    }
  };
  // CLICK handler CLOSE
  const toggleClose = (e) => {
    e.stopPropagation(); // Prevent event bubbling so toggleClose works properly
    // Close all tiles and resets tabindex=0 so they are all tabbable
    const sections = document.querySelectorAll("#projects > li");
    for (let i = 0; i < sections.length; i++) {
      sections[i].classList.remove("open");
      sections[i].classList.remove("closed");
      sections[i].setAttribute("tabindex", 0);
    }
    e.currentTarget.parentNode.parentNode.setAttribute("aria-expanded", false);
    // Resets .details and .js-screenshots blocks back to non-readable via screenreaders
    e.currentTarget.previousSibling.previousSibling
      .querySelector(".details")
      .setAttribute("aria-hidden", true);
    const screenContainer =
      e.currentTarget.parentNode.querySelector(".js-screenshots");
    screenContainer.setAttribute("aria-hidden", true);
    const screens = e.currentTarget.previousSibling.querySelectorAll(
      ".js-screenshots img"
    );
    for (let i = 0; i < screens.length; i++) {
      screens[i].setAttribute("aria-hidden", true);
    }
    const links =
      e.currentTarget.previousSibling.previousSibling.querySelectorAll(
        ".details a"
      );
    for (let j = 0; j < links.length; j++) {
      links[j].tabIndex = -1;
      links[j].setAttribute("aria-hidden", true);
    }
  };

  // ENTER handler OPEN
  const enterHandler = (e) => {
    if (e.keyCode === 13) {
      toggleOpen(e);
      e.currentTarget.focus();
    }
  };
  // ENTER handler CLOSE
  const enterCloseHandler = (e) => {
    if (e.keyCode === 13) {
      toggleClose(e);
      e.currentTarget.parentNode.parentNode.focus();
    }
  };

  return (
    <main>
      <ul
        id="projects"
        className={styles.projects}
        aria-label="List of projects"
        ref={divRef}
      >
        {/* Tiles capped at 6 reverse order - most recent at the end of array */}
        {projects
          .slice(-6)
          .reverse()
          .map((project, index) => (
            <li
              className={`projectTile${index + 1}`}
              key={project.id}
              onClick={toggleOpen}
              onKeyDown={enterHandler}
              tabIndex={0}
            >
              <div className={styles.tile}>
                <div className={styles.text}>
                  <h3 id={`projectTitle${index + 1}`}>
                    {project.projectName}{" "}
                    <span className={styles.visuallyhidden}> project</span>
                  </h3>
                  <div className="details" aria-hidden={true}>
                    {project.desc ? <p>{project.desc}</p> : null}
                    {project.work ? <p>{project.work}</p> : null}
                    {project.link ? (
                      <p>
                        Visit website:
                        <br />
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {project.link}
                        </a>
                      </p>
                    ) : null}
                    {project.features.length > 0 ? (
                      <>
                        <p>Features:</p>
                        <ul>
                          {project.features.map((item, index) => {
                            return <li key={index}>{item}</li>;
                          })}
                        </ul>
                      </>
                    ) : null}
                  </div>
                </div>
                <div
                  className={`${styles.screenshots} js-screenshots`}
                  aria-label={`Sample screenshots of ` + project.projectName}
                  aria-hidden={true}
                >
                  {project.imgSrc.map((screenshot, index) => {
                    return (
                      <div key={index} className={styles.img}>
                        <img
                          src={process.env.PUBLIC_URL + screenshot.url}
                          alt={screenshot.alt}
                          aria-hidden={true}
                        />
                      </div>
                    );
                  })}
                </div>
                <button
                  className="closedetails"
                  onClick={toggleClose}
                  onKeyDown={enterCloseHandler}
                >
                  <span className={styles.visuallyhidden}>
                    Close details on {project.projectName} project.
                  </span>
                </button>
              </div>
            </li>
          ))}
      </ul>
    </main>
  );
}

export default Projects;
