import React, { useEffect, useRef } from "react";
import projects from "./project_tiles";

import "../../css/global.scss";
import styles from "./ProjectsList.module.scss";

function Projects() {
  // Initial set LI attributes
  const addARIA = () => {
    const projectLIs = document.querySelectorAll("#projects > li");
    for (let i = 0; i < projectLIs.length; i++) {
      projectLIs[i].setAttribute("aria-expanded", false);
      projectLIs[i].setAttribute("role", "listitem");
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
      // Set .js-screenshots images active so it is readable via screenreaders
      const screens = e.currentTarget.querySelectorAll(".js-screenshots img");
      for (let i = 0; i < screens.length; i++) {
        screens[i].setAttribute("aria-hidden", false);
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
    // Resets .details and .js-screenshots images blocks back to non-readable via screenreaders
    e.currentTarget.previousSibling.previousSibling.querySelector(".details").setAttribute("aria-hidden", true);
    const screens = e.currentTarget.previousSibling.querySelectorAll(".js-screenshots img");
    for (let i = 0; i < screens.length; i++) {
      screens[i].setAttribute("aria-hidden", true);
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
        {projects.map((project) => (
          <li
            className={`projectTile${project.id}`}
            key={project.id}
            onClick={toggleOpen}
            onKeyDown={enterHandler}
            tabIndex={0}
          >
            <div className={styles.tile}>
              <div className={styles.text}>
                <h3 id={`projectTitle${project.id}`}>
                  {project.projectName}{" "}
                  <span className={styles.visuallyhidden}> project</span>
                </h3>
                <div className="details" aria-hidden={true}>
                  <p>Features:</p>
                  <ul>
                    {project.features.map((item, index) => {
                      return <li key={index}>{item}</li>;
                    })}
                  </ul>
                </div>
              </div>
              <div className={`${styles.screenshots} js-screenshots`}>
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
