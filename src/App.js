import "./css/global.scss";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.container}>
      <header className={styles.fade}>
        <h1 className={styles.myname}>Kevin Leung</h1>
        <h2 className={styles.myskills}>Web/HTML Programmer</h2>
        <p className={styles.mywork}>See what I worked on</p>
      </header>
      <main className={styles.projects}>
        <section
          className={styles.fade}
          style={{ background: "lightgray" }}
        ></section>
        <section
          className={styles.fade}
          style={{ background: "lightpink" }}
        ></section>
        <section
          className={styles.fade}
          style={{ background: "darkgoldenrod" }}
        ></section>
        <section
          className={styles.fade}
          style={{ background: "lightskyblue" }}
        ></section>
        <section
          className={styles.fade}
          style={{ background: "lightcoral" }}
        ></section>
        <section
          className={styles.fade}
          style={{ background: "gold" }}
        ></section>
      </main>
      {/* <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
