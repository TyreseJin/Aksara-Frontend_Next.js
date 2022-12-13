import { InferGetStaticPropsType, GetStaticProps } from "next";
import { Page } from "@lib/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import KawasankuDashboard from "@dashboards/kawasanku";
import Metadata from "@components/Metadata";
import { useTranslation } from "next-i18next";
import { get } from "@lib/api";
import { STATES } from "@lib/schema/kawasanku";

const KawasankuIndex: Page = ({
  bar,
  jitterplot,
  pyramid,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();

  return (
    <>
      <Metadata
        title={t("nav.megamenu.dashboards.kawasanku")}
        description={t("kawasanku.description")}
        keywords={""}
      />
      <KawasankuDashboard
        bar={bar}
        jitterplot={jitterplot}
        pyramid={pyramid}
        jitterplot_options={STATES.filter(item => item.value !== "malaysia")}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const i18n = await serverSideTranslations(locale!, ["common"]);

  const { data } = await get("/dashboard/", {
    "dashboard": "kawasanku_admin",
    "area": "malaysia",
    "area-type": "state",
  });

  // disable page
  return {
    props: {
      ...i18n,
      bar: data.bar_chart,
      jitterplot: data.jitter_chart,
      pyramid: data.pyramid_chart,
    },
  };
};

export default KawasankuIndex;
