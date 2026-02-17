import styles from "./dashboardPages.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
  editIcon,
  checkIcon,
  globeIcon,
  previewIcon,
} from "../../../../constants/assets";
import { LinearProgress, TextField } from "@mui/material";
import { contentType } from "../../../../constants/types";
import DropFileZone from "../../../../components/DropFileZone";
import { useEffect } from "react";
import { useDialog } from "../../../../hooks/useDialog";
import { useAlertSnackBar } from "../../../../hooks/useAlertSnackbar";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { FieldEditor } from "../../../../components/CMS";

function DashboardPageHome() {
  const router = useNavigate();
  const authHeader = useAuthHeader();
  const showAlertSnackBar = useAlertSnackBar();
  const slug = "home";
  const [pageInfos, setPageInfos] = useState(null);
  const [pageTexts, setPageTexts] = useState(null);
  const [pageSuccessStories, setPageSuccessStories] = useState(null);
  const [pageMetrics, setPageMetrics] = useState(null);

  useEffect(() => {
    fetch(`/api/Pages/${slug}/content`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(resp.statusText);
        }

        return resp.json();
      })
      .then((data) => {
        setPageMetrics(
          data.pageMetrics.map((item) => ({
            ...item,
            type: contentType.kpi,
            section: item.htmlElementId.split("_")[1].split("section")[1],
          }))
        );
        setPageTexts(
          data.pageTexts.map((item) => ({
            ...item,
            section: item.htmlElementId.split("_")[1].split("section")[1],
          }))
        );
        setPageSuccessStories(
          data.pageSuccessStories.map((item) => ({
            ...item,
            type: contentType.successStory,
            section: item.htmlElementId.split("_")[1].split("section")[1],
          }))
        );

        delete data.pageMetrics;
        delete data.pageSuccessStories;
        delete data.pageTexts;
        setPageInfos(data);
      })
      .catch((error) => console.error(error));
  }, [slug]);

  const handleEditClick = (data, e) => {
    e.preventDefault();

    if (data.type == contentType.successStory) {
      router("/dashboard/success-stories/" + data.successStory.slug);
      return;
    }

    let newPageContent;
    let setPageContent;

    switch (data.type) {
      case contentType.image:
      case contentType.video:
      case contentType.text:
        newPageContent = [...pageTexts];
        setPageContent = setPageTexts;
        break;

      case contentType.kpi:
        newPageContent = [...pageMetrics];
        setPageContent = setPageMetrics;
        break;

      default:
        return;
    }

    newPageContent = [...newPageContent].map((item, index2) => {
      if (data.id == item.id) {
        return item;
      }
      item.editMode = false;
      return item;
    });

    const elementIndex = newPageContent.findIndex((item) => item.id == data.id);

    if (elementIndex == -1) {
      return;
    }

    newPageContent[elementIndex].editMode =
      !newPageContent[elementIndex].editMode;

    setPageContent(newPageContent);
  };

  const groupBySection = (contentArray) => {
    return contentArray.reduce((sections, item) => {
      const section = item.section;
      if (!sections[section]) {
        sections[section] = [];
      }
      sections[section].push(item);
      return sections;
    }, {});
  };

  const handleEditChange = (id, type, e) => {
    let newPageContent;
    let setPageContent;

    switch (type) {
      case contentType.image:
      case contentType.video:
      case contentType.text:
        newPageContent = [...pageTexts];
        setPageContent = setPageTexts;
        break;

      case contentType.kpi:
        newPageContent = [...pageMetrics];
        setPageContent = setPageMetrics;
        break;

      // case contentType.bullet:
      //   newPageContent = [...pageTextLists];
      //   setPageContent = setPageTextLists;
      //   break;

      default:
        return;
    }

    const elementIndex = newPageContent.findIndex((item) => item.id == id);

    if (elementIndex == -1) {
      return;
    }

    newPageContent[elementIndex][e.target.name] = e.target.value;
    newPageContent[elementIndex].isModified = true;

    setPageContent(newPageContent);
  };

  console.error(pageSuccessStories);

  const handlePageUpdate = async () => {
    const updatedPageTexts = pageTexts.filter((item) => item.isModified);
    const updatedPageKpis = pageMetrics.filter((item) => item.isModified);
    const updatedPageTextLists = pageSuccessStories.filter(
      (item) => item.isModified
    );

    const resp = await fetch(`/api/Pages/content`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify({
        pageTexts: updatedPageTexts,
        pageMetrics: updatedPageKpis,
        pageSuccessStories: updatedPageTextLists,
      }),
    });

    if (resp.ok) {
      await showAlertSnackBar({
        title: "Page updated successfully!",
        severity: "success",
      });
    } else {
      await showAlertSnackBar({
        title: "Error while updating page, try again",
        severity: "error",
      });
    }
  };

  if (!pageInfos || !pageMetrics || !pageTexts || !pageSuccessStories) {
    return (
      <div style={{ width: "100%", paddingRight: "2rem" }}>
        <LinearProgress color="primary" />
      </div>
    );
  }

  return (
    <>
      <section className={styles.mainContent}>
        <h1 className={styles.mainTitle}>
          <a href="/dashboard">Pages</a> /{" "}
          <a href={`/dashboard/pages/${pageInfos?.slug}`}>{pageInfos?.title}</a>
        </h1>
        <div className={styles.mainContentContainer}>
          <div className={styles.firstColumn}>
            {Object.entries(
              groupBySection([
                ...pageTexts,
                ...pageMetrics,
                ...pageSuccessStories,
              ])
            ).map(([section, items]) => (
              <div key={section} className={styles.innerSection}>
                <div className={styles.innerSectionHeader}>
                  <h3>Section {section}</h3>
                </div>
                <div className={styles.innerSectionContent}>
                  {items.map((item, index) => (
                    <FieldEditor
                      key={item.html_element_id}
                      data={item}
                      onClick={(e) => handleEditClick(item, e)}
                      onChange={handleEditChange}
                    />
                  ))}
                </div>
              </div>
            ))}
            <br />
          </div>
          <div>
            <div className={styles.secondColumn}>
              <div className={styles.secondColHeader}>
                <button className={styles.previewBtn}>
                  <img src={previewIcon} width={20} height={20} /> Preview
                </button>
                <button
                  className={styles.publishBtn}
                  onClick={handlePageUpdate}
                >
                  <img src={globeIcon} width={20} height={20} /> Publish
                </button>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DashboardPageHome;
