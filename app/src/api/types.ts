export type Repository = {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  description: string | null;
  stargazers_count: number;
  default_branch: string;
  forks_count: number;
  language: string | null; 
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
    type: string;
  };
};

export type PackageDetails = {
  name: string;
  version: string;
}

export type DependencyDetails = PackageDetails & {
  type: "dependency" | "devDependency";
  outOfDate?: boolean;
}

export type RepositoryDetails = Repository & {
  html_url: string;
  topics: string[];
}

export type RepositoryDependencies = {
  packageDetails: PackageDetails;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

export type DependentRepository = {
  id: number;
  name: string;
  full_name: string;
  file_path: string;
  targetDependency: DependencyDetails;
}