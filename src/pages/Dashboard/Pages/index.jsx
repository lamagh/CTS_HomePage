import styles from "./dashboardPages.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { globeIcon, previewIcon } from "../../../constants/assets";
import { Button, LinearProgress, TextField } from "@mui/material";
import { contentType } from "../../../constants/types";
import { useEffect } from "react";
import { useAlertSnackBar } from "../../../hooks/useAlertSnackbar";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { FieldEditor } from "../../../components/CMS";
import MultipleSelectInput from "../../../components/MultiSelectInput";

function DashboardPages() {
  const authHeader = useAuthHeader();
  const showAlertSnackBar = useAlertSnackBar();
  const slug = useParams().slug;
  const [pageInfos, setPageInfos] = useState(null);
  const [pageTexts, setPageTexts] = useState(null);
  const [pageMetrics, setPageMetrics] = useState(null);
  const [pageSuccessStories, setPageSuccessStories] = useState(null);
  const [pageServices, setPageServices] = useState(null);
  const [pageProducts, setPageProducts] = useState(null);

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
        setPageProducts(
          data.pageProducts.map((item) => ({
            ...item,
            type: contentType.product,
            section: item.htmlElementId.split("_")[1].split("section")[1],
          }))
        );
        setPageServices(
          data.pageServices.map((item) => ({
            ...item,
            type: contentType.service,
            section: item.htmlElementId.split("_")[1].split("section")[1],
          }))
        );

        delete data.pageTexts;
        delete data.pageMetrics;
        delete data.pageSuccessStories;
        delete data.pageProducts;
        delete data.pageServices;
        setPageInfos(data);
      })
      .catch((error) => console.error(error));
  }, [slug]);

  const handleEditClick = (data, e) => {
    e.preventDefault();

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

  const handleDropDownChange = (value, items, type) => {
    let newPageContent;
    let setPageContent;
    let accessorKey;

    switch (type) {
      case contentType.successStory:
        newPageContent = [...pageSuccessStories];
        setPageContent = setPageSuccessStories;
        accessorKey = "successStory";
        break;

      case contentType.product:
        newPageContent = [...pageProducts];
        setPageContent = setPageProducts;
        accessorKey = "product";
        break;

      case contentType.service:
        newPageContent = [...pageServices];
        setPageContent = setPageServices;
        accessorKey = "service";
        break;

      default:
        return;
    }

    const currentSection = items[0].section;

    const currentSectionStories = newPageContent.filter(
      (story) => story.section === currentSection
    );

    const deletedStories = currentSectionStories
      .filter((e) => !value.find((newE) => newE.id === e[accessorKey].id))
      .map((e) => ({
        ...e,
        isDeleted: true,
      }));

    newPageContent = newPageContent.filter(
      (e) => e.section !== currentSection || e.isDeleted
    );

    const newStories = value.map((story, index) => ({
      pageId: pageInfos.id,
      [accessorKey]: {
        id: story.id,
        title: story.title,
        slug: story.slug,
      },
      htmlElementId: `${accessorKey}_section${currentSection}_container`,
      section: currentSection,
      type: type,
      isModified: true,
    }));

    setPageContent([...newPageContent, ...deletedStories, ...newStories]);
  };

  const handleDropDownDelete = (value, type) => {
    let newPageContent;
    let setPageContent;
    let accessorKey;

    switch (type) {
      case contentType.successStory:
        newPageContent = [...pageSuccessStories];
        setPageContent = setPageSuccessStories;
        accessorKey = "successStory";
        break;

      case contentType.product:
        newPageContent = [...pageProducts];
        setPageContent = setPageProducts;
        accessorKey = "product";
        break;

      case contentType.service:
        newPageContent = [...pageServices];
        setPageContent = setPageServices;
        accessorKey = "service";
        break;

      default:
        return;
    }

    newPageContent = newPageContent.map((e) => {
      if (e[accessorKey].id == value.id) {
        return {
          ...e,
          isDeleted: true,
        };
      }

      return e;
    });

    setPageContent([...newPageContent]);
  };

  const handlePageUpdate = async () => {
    const updatedPageTexts = pageTexts.filter((item) => item.isModified);
    const updatedPageKpis = pageMetrics.filter((item) => item.isModified);
    const updatedPageSuccessStories = pageSuccessStories
      .filter((item) => !item.isDeleted)
      .map((item) => ({
        id: item.successStory.id,
        htmlElementId: item.htmlElementId,
      }));
    const updatePageProducts = pageProducts
      .filter((item) => !item.isDeleted)
      .map((item) => ({
        id: item.product.id,
        htmlElementId: item.htmlElementId,
      }));
    const updatePageServices = pageServices
      .filter((item) => !item.isDeleted)
      .map((item) => ({
        id: item.service.id,
        htmlElementId: item.htmlElementId,
      }));

    if (
      (updatedPageSuccessStories.length == 0 &&
        pageSuccessStories.length != 0) ||
      (updatePageProducts.length == 0 && pageProducts.length != 0) ||
      (updatePageServices.length == 0 && pageServices.length != 0)
    ) {
      showAlertSnackBar({
        title: "You should at least select one item!",
        severity: "error",
      });
      return;
    }

    const resp = await fetch(`/api/Pages/${slug}/content`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify({
        pageTexts: updatedPageTexts,
        pageMetrics: updatedPageKpis,
        pageSuccessStories: updatedPageSuccessStories,
        pageProducts: updatePageProducts,
        pageServices: updatePageServices,
      }),
    });

    if (resp.ok) {
      await showAlertSnackBar({
        title: "Page updated successfully!",
        severity: "success",
      });
      location.reload();
    } else {
      await showAlertSnackBar({
        title: "Error while updating page, try again",
        severity: "error",
      });
      location.reload();
    }
  };

  if (
    !pageInfos ||
    !pageMetrics ||
    !pageTexts ||
    !pageSuccessStories ||
    !pageProducts ||
    !pageServices
  ) {
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
                ...pageProducts,
                ...pageServices,
              ])
            ).map(([section, items]) => {
              let objectItems = items.filter(
                (e) =>
                  e.type == contentType.successStory ||
                  e.type == contentType.product ||
                  e.type == contentType.service
              );

              return (
                <div key={section} className={styles.innerSection}>
                  <div className={styles.innerSectionHeader}>
                    <h3>Section {section}</h3>
                  </div>
                  <div className={styles.innerSectionContent}>
                    {items.map(
                      (item, index) =>
                        item.type != contentType.successStory &&
                        item.type != contentType.product &&
                        item.type != contentType.service && (
                          <FieldEditor
                            key={item.html_element_id}
                            data={item}
                            onClick={(e) => handleEditClick(item, e)}
                            onChange={handleEditChange}
                          />
                        )
                    )}
                    {objectItems.length > 0 && (
                      <ObjectEditor
                        items={items}
                        value={objectItems
                          .filter((item) => !item.isDeleted)
                          .map((e) => e[objectItems[0].type])}
                        type={objectItems[0].type}
                        onChange={handleDropDownChange}
                        onDelete={handleDropDownDelete}
                      />
                    )}
                  </div>
                </div>
              );
            })}
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

export default DashboardPages;

function ObjectEditor({ value, onChange, onDelete, items, type }) {
  const router = useNavigate();

  const determineEditor = () => {
    switch (type) {
      case contentType.successStory:
        return {
          api: "/api/SuccessStories",
          label: "Select Success Stories",
          editLink: "/dashboard/success-stories",
          accessorKey: "successStory",
        };

      case contentType.product:
        return {
          api: "/api/Products",
          label: "Select Products",
          editLink: "/dashboard/products",
          accessorKey: "product",
        };

      case contentType.service:
        return {
          api: "/api/Services",
          label: "Select Services",
          editLink: "/dashboard/services",
          accessorKey: "service",
        };

      default:
        return {};
    }
  };

  const handleAddNewObject = (link) => {
    router(`${link}/new`);
  };

  return (
    <div className={styles.objectContainer}>
      <div style={{ marginRight: "5rem", top: "1rem" }}>
        <MultipleSelectInput
          value={value}
          options={[]}
          api={determineEditor().api}
          label={determineEditor().label}
          editLink={determineEditor().editLink}
          onChange={(value) => onChange(value, items, type)}
          onDelete={(value) => onDelete(value, type)}
        />
      </div>
      <button
        className={`${styles.editButton}`}
        onClick={() => handleAddNewObject(determineEditor().editLink)}
      >
        +
      </button>
    </div>
  );
}
