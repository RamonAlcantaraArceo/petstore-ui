# S3 Visual Report Bucket Setup Plan

This checklist ensures your S3 bucket is ready for visual report publishing, CI, and rollback safety. Follow each step and check off as you go.

To disable the aws as pager (which can interfere with scripts), run:

```
aws configure set cli_pager ""
```

---

## 1. Prerequisites

- [x] Install/update AWS CLI v2 (`aws --version`)
- [x] Authenticate (prefer SSO): `aws configure sso`
  - [x] IAM Identity Center Enabled in AWS console
  - [x] Create SSO user with appropriate permissions
  - [x] Assign permission Set (e.g., AdministratorAccess for setup)

  ```shell
  aws configure sso
  SSO session name (Recommended): minimac
  SSO start URL [None]: https://d-906602631e.awsapps.com/start
  SSO region [None]: us-east-1
  SSO registration scopes [sso:account:access]:
  Attempting to open your default browser.
  If the browser does not open, open the following URL:

  https://oidc.us-east-1.amazonaws.com/authorize?response_type=code&client_id=ZubMp01HIOZLMNnx6d8rWnVzLWVhc3QtMQ&redirect_uri=http%3A%2F%2F127.0.0.1%3A57880%2Foauth%2Fcallback&state=e2bc0abc-e10f-448c-81bb-14fd39a47a10&code_challenge_method=S256&scopes=sso%3Aaccount%3Aaccess&code_challenge=4GbMNVvTs1b3nzKWwyKXb9Q8EkSxH2w-L4CReDog2gg
  The only AWS account available to you is: 706503910195
  Using the account ID 706503910195
  The only role available to you is: AdministratorAccess
  Using the role name "AdministratorAccess"
  Default client Region [None]: us-east-1
  CLI default output format (json if not specified) [None]:
  Profile name [AdministratorAccess-706503910195]: AdministratorAccess-minimac-lewis
  To use this profile, specify the profile name using --profile, as shown:

  aws sts get-caller-identity --profile AdministratorAccess-minimac-lewis
  ```

- [x] Verify identity/account: `aws sts get-caller-identity --profile AdministratorAccess-minimac-lewis`
- [x] Confirm access to intended AWS region/account
- [x] Confirm sso login: `aws sso login --sso-session minimac`
- [x] Confirm account credentials present through login: `aws login`

## 2. Naming & Environment Strategy

- [ ] Choose AWS region (e.g., `us-east-1`)
- [ ] Decide on unique bucket name (e.g., `petstore-ui-visual-reports-<account-id>-<region>`)
- [ ] Decide on environment prefixing (e.g., `dev/`, `staging/`, `prod/`)
- [ ] Record these as source-of-truth values:
  - `AWS_REGION`
  - `S3_VISUAL_REPORTS_BUCKET`
  - `S3_VISUAL_REPORTS_PREFIX` (if used)

| Name                 | Key                      | Value                                             |
| -------------------- | ------------------------ | ------------------------------------------------- |
| region               | AWS_REGION               | us-east-1                                         |
| bucket name          | S3_VISUAL_REPORTS_BUCKET | petstore-ui-visual-reports-706503910195-us-east-1 |
| environment prefixes | S3_VISUAL_REPORTS_PREFIX | dev/, staging/, prod/                             |
| aws account id       | AWS_ACCOUNT_ID           | 706503910195                                      |
| IAM OIDC role name   | OIDC_ROLE_NAME           | petstore-ui-visual-report-ci                      |

```bash
#!/bin/bash
# S3 Visual Report Bucket Setup - Environment Variables

# AWS Configuration
export AWS_REGION="us-east-1"
export S3_VISUAL_REPORTS_BUCKET="petstore-ui-visual-reports-706503910195-us-east-1"
export S3_VISUAL_REPORTS_PREFIX="dev/"

# AWS Profile (if using SSO)
export AWS_PROFILE="AdministratorAccess-minimac-lewis"

# Verify setup
echo "✓ AWS_REGION: $AWS_REGION"
echo "✓ S3_VISUAL_REPORTS_BUCKET: $S3_VISUAL_REPORTS_BUCKET"
echo "✓ S3_VISUAL_REPORTS_PREFIX: $S3_VISUAL_REPORTS_PREFIX"
echo "✓ AWS_PROFILE: $AWS_PROFILE"

# Test credentials
aws sts get-caller-identity --profile "$AWS_PROFILE"
```

**Usage:**

```bash
source ./scripts/setup-s3-env.sh
```

Or inline:

```bash
export AWS_REGION="us-east-1" && \
export S3_VISUAL_REPORTS_BUCKET="petstore-ui-visual-reports-706503910195-us-east-1" && \
export S3_VISUAL_REPORTS_PREFIX="dev/" && \
export AWS_PROFILE="AdministratorAccess-minimac-lewis"
```

## 3. Create the S3 Bucket

- [x] Create bucket in region:
  - For `us-east-1`: `aws s3api create-bucket --bucket $S3_VISUAL_REPORTS_BUCKET --region us-east-1`
  - For other regions: `aws s3api create-bucket --bucket $S3_VISUAL_REPORTS_BUCKET --region <region> --create-bucket-configuration LocationConstraint=<region>`

  ```json
  {
    "Location": "/petstore-ui-visual-reports-706503910195-us-east-1",
    "BucketArn": "arn:aws:s3:::petstore-ui-visual-reports-706503910195-us-east-1"
  }
  ```

## 4. Apply Security Controls

- [x] Block all public access:
  - `aws s3api put-public-access-block --bucket $S3_VISUAL_REPORTS_BUCKET --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true`
- [x] Enforce bucket owner ownership:
  - `aws s3api put-bucket-ownership-controls --bucket $S3_VISUAL_REPORTS_BUCKET --ownership-controls 'Rules=[{ObjectOwnership=BucketOwnerEnforced}]'`
- [x] Enable versioning:
  - `aws s3api put-bucket-versioning --bucket $S3_VISUAL_REPORTS_BUCKET --versioning-configuration Status=Enabled`
- [x] Enable default encryption (SSE-S3):
  - `aws s3api put-bucket-encryption --bucket $S3_VISUAL_REPORTS_BUCKET --server-side-encryption-configuration '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"}}]}'`
- [ ] (If required) Set up KMS and grant CI role access

## 5. Add Lifecycle Rules

- [ ] Set up lifecycle policy to expire old reports (e.g., 90 days for immutable, longer for `latest`)
- [ ] Use `aws s3api put-bucket-lifecycle-configuration ...` with a JSON file

## 6. Set Up GitHub OIDC Role

- [x] Ensure IAM OIDC provider exists: `token.actions.githubusercontent.com`
- [x] Create IAM role for GitHub Actions with trust policy restricted to your repo/branch
- [x] Attach least-privilege policy for S3 prefix access
- [ ] (If using KMS) Add KMS permissions for CI role [skip]

## 7. Wire CI Variables

- [ ] Add `AWS_REGION`, `S3_VISUAL_REPORTS_BUCKET`, and env selector to GitHub Actions/repo vars
- [ ] Use `aws-actions/configure-aws-credentials` with `role-to-assume` in workflow
- [ ] Avoid static AWS keys

## 8. Validate Bucket and Permissions

- [ ] Confirm bucket exists: `aws s3api head-bucket --bucket $S3_VISUAL_REPORTS_BUCKET`
- [ ] Check security settings:
  - `aws s3api get-public-access-block --bucket $S3_VISUAL_REPORTS_BUCKET`
  - `aws s3api get-bucket-versioning --bucket $S3_VISUAL_REPORTS_BUCKET`
  - `aws s3api get-bucket-encryption --bucket $S3_VISUAL_REPORTS_BUCKET`
- [ ] Test permissions (from CI role): upload, read, and delete a test file in the correct prefix

## 9. Validate Visual Report Publish Path

- [ ] Local mode works without S3 vars (`bun run build-storybook`, `bun run report:visual:build`)
- [ ] S3 publish mode works with vars set (run publish script)
- [ ] Confirm objects land in `<env>/visual-report/<sha>/...` and `<env>/visual-report/latest/...`
- [ ] Open resulting S3/CloudFront URL and verify assets load

## 10. Common Pitfalls to Avoid

- [ ] Trust policy `sub` matches correct repo/branch
- [ ] Bucket policy is scoped to env prefix
- [ ] KMS key policy includes CI role
- [ ] Region matches between bucket and CLI/workflow
- [ ] Public access is blocked unless intentionally exposed

## 11. Done Checklist

- [ ] Bucket created in correct account/region
- [ ] Security controls (public block, ownership, encryption, versioning) enabled
- [ ] Lifecycle rules applied
- [ ] OIDC role created with least privilege
- [ ] CI variables set and publish succeeds
- [ ] Report URL works for expected audience

---

**Tip:** If you need IAM trust/permissions policy JSON for your repo/branch and env, ask for a template.
